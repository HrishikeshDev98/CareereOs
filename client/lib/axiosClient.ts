import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

const axiosClient = (contentType = 'application/json', customHeaders = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
      'Content-Type': contentType,
      ...customHeaders,
    },
  })

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const raw = localStorage.getItem('tokens')
    const { accessToken } = (raw ? JSON.parse(raw) : {}) as { accessToken?: string }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  return instance
}

export default axiosClient
