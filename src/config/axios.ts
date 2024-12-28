import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

import { clearTokens, getTokens, setTokens } from '@/utils/tokens'

const BASE_URL = 'http://localhost:8080/api/v1/'

const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use(
	async function (config) {
		const tokens = getTokens()

		if (tokens.accessToken && tokens.refreshToken) {
			const { exp } = jwtDecode(tokens.accessToken)

			if (exp && Date.now() / 1000 > exp) {
				const { data } = await axios.get(`${BASE_URL}auth/refresh`, {
					headers: {
						Authorization: `Bearer ${tokens.refreshToken}`,
					},
				})

				if ('error' in data) {
					clearTokens()
					return config
				}

				setTokens(data.data)
				config.headers.Authorization = `Bearer ${data.data.accessToken}`
				return config
			}

			config.headers.Authorization = `Bearer ${tokens.accessToken}`
		} else {
			clearTokens()
		}

		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

export default api
