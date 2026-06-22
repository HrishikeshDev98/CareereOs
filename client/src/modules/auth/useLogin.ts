import { useNavigate } from 'react-router-dom'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'

import api from '@/lib/api'

interface LoginPayload {
  email: string
  password: string
}
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  bio: string | null
  phone: string | null
  location: string | null
  linkedinUrl: string | null
  portfolioUrl: string | null
  isVerified: boolean
  createdAt: string
  updatedAt: string
}
interface LoginResponse {
  message: string
  status: string
  data: {
    accessToken: string
    refreshToken: string
    user: User
  }
}

interface UseLoginReturn {
  loginUser: UseMutationResult<LoginResponse, Error, LoginPayload>
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate()

  const loginUser = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<LoginResponse>('/auth/login', payload)

      const accessToken = data.data?.accessToken
      const refreshToken = data.data?.refreshToken

      if (!accessToken || !refreshToken) {
        toast('Login failed , Please try again')
      } else {
        localStorage.setItem('user-info', JSON.stringify(data.data.user))
        localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }))
        navigate('/')
      }

      return data
    },
  })

  return { loginUser }
}
