import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

import { clearTokens, getTokens, setTokens } from '@/utils/jwt'

export const BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use(
	async (config) => {
		const { accessToken, refreshToken } = getTokens()

		if (accessToken && refreshToken) {
			const { exp } = jwtDecode(accessToken)
			console.log(
				exp,
				Date.now(),
				'expired in: ',
				exp ? new Date(exp * 1000).toLocaleTimeString() : 0,
			)

			if (exp && Date.now() >= exp * 1000) {
				console.log('Expired')

				try {
					const response = await axios.get(
						`${BASE_URL}/auth/refresh`,
						{
							headers: {
								Authorization: `Bearer ${refreshToken}`,
							},
						},
					)

					const tokens = response.data.data
					config.headers.Authorization = `Bearer ${tokens.accessToken}`
					setTokens(tokens.accessToken, tokens.refreshToken)
				} catch (error) {
					if (error instanceof AxiosError) {
						console.log('Refresh token error: ', error)
					}

					clearTokens()
				}
			} else {
				config.headers.Authorization = `Bearer ${accessToken}`
			}
		} else {
			clearTokens()
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

api.interceptors.response.use((response) => response.data)

export default api
