import { clearTokens, getTokens, setTokens } from '@/utils/tokens'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1/',
})

api.interceptors.request.use(
	async function (config) {
		const tokens = getTokens()

		if (tokens.accessToken && tokens.refreshToken) {
			const { exp } = jwtDecode(tokens.accessToken)

			if (exp && exp < Date.now() / 1000) {
				const { data } = await api.get('auth/refresh', {
					headers: {
						Authorization: `Bearer ${tokens.refreshToken}`,
					},
				})

				setTokens(data.data)
				config.headers.Authorization = `Bearer ${data.data.accessToken}`
			} else {
				config.headers.Authorization = `Bearer ${tokens.accessToken}`
			}
		} else {
			clearTokens()
		}

		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default api
