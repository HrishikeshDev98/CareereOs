import { useNavigate } from 'react-router-dom'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'

import api from '@/src/lib/api'

interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface RegisterResponse {
  message: string
  token: string
  accessToken: string
  refreshToken: string
}

interface UseRegisterReturn {
  registerUser: UseMutationResult<RegisterResponse, Error, RegisterPayload>
}

export const useRegister = (): UseRegisterReturn => {
  const navigate = useNavigate()

  const registerUser = useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<RegisterResponse>('/auth/register', payload)

      localStorage.setItem(
        'user-info',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      )

      if (data.accessToken) {
        toast('User Registered Successfully !')
        navigate('/login')
      } else {
        toast('User Registeration Failed !')
      }

      return data
    },
  })

  return { registerUser }
}
