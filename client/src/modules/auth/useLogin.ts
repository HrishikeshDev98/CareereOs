import { useNavigate } from 'react-router-dom'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import api from '@/src/lib/api'

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
      const { data }: AxiosResponse<LoginResponse> = await api.post<LoginResponse>(
        '/auth/login',
        payload
      )
      console.log(data?.data)

      const accessToken = data.data?.accessToken
      const refreshToken = data.data?.refreshToken

      if (!accessToken || !refreshToken) {
        toast('Login failed , Please try again')
      } else {
        console.log('Else')
        localStorage.setItem(
          'user-info',
          JSON.stringify({
            'user-info': data.data.user,
          })
        )
        localStorage.setItem(
          'tokens',
          JSON.stringify({
            accessToken,
            refreshToken,
          })
        )
        navigate('/')
      }

      return data
    },
  })

  return { loginUser }
}
