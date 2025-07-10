import axios from 'axios'

const api = axios.create({
    baseURL: 'https://myblog-backend-0u9v.onrender.com/api/',
})

// 自动附加 token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default api
