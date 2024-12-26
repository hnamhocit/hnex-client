import { JwtToken } from '@/types/auth/jwtToken'

const setTokens = (tokens: JwtToken) => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)
}

const getTokens = () => {
	return {
		accessToken: localStorage.getItem('accessToken'),
		refreshToken: localStorage.getItem('refreshToken'),
	}
}

const clearTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
}

export { clearTokens, getTokens, setTokens }
