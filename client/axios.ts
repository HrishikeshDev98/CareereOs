import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const axiosInstance = (contentType = 'application/json', customHeaders = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
      'Content-Type': contentType,
      ...customHeaders,
    },
  })

  const token = localStorage.getItem('user-info')
  const { accessToken } = JSON.parse(token ?? '{}') || {}

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )

  return instance
}

export default axiosInstance
