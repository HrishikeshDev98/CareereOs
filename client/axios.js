import axios from 'axios'

const axiosInstance = (
  baseURL,
  token,
  contentType = 'application/json;charset=utf-8',
  customHeaders = {}
) => {
  const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      ...customHeaders,
    },
  })

  // Add a request interceptor to include the token in requests
  instance.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Add a response interceptor to handle errors
  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )

  return instance
}
