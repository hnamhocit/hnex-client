import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
	withCredentials: true,
})

api.interceptors.response.use((response) => response.data)

export default api
