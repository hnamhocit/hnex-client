const jwtKeys = { access_token: 'access_token', refresh_token: 'refresh_token' }

const getTokens = () => {
	const accessToken = localStorage.getItem(jwtKeys.access_token)
	const refreshToken = localStorage.getItem(jwtKeys.refresh_token)
	return { accessToken, refreshToken }
}

const clearTokens = () => {
	localStorage.removeItem(jwtKeys.access_token)
	localStorage.removeItem(jwtKeys.refresh_token)
}

const setTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem(jwtKeys.access_token, accessToken)
	localStorage.setItem(jwtKeys.refresh_token, refreshToken)
}

export { clearTokens, getTokens, jwtKeys, setTokens }
