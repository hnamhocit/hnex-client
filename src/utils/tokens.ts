import { IJwtToken } from '@/interfaces/auth/jwtToken'

const setTokens = (tokens: IJwtToken) => {
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
