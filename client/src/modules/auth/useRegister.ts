import { useNavigate } from 'react-router-dom'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'

import api from '@/lib/api'

interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface RegisteredUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface RegisterResponse {
  status: string
  message: string
  data: {
    message: string
    user: RegisteredUser
  }
}

interface UseRegisterReturn {
  registerUser: UseMutationResult<RegisterResponse, Error, RegisterPayload>
}

export const useRegister = (): UseRegisterReturn => {
  const navigate = useNavigate()

  const registerUser = useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<RegisterResponse>('/auth/register', payload)

      if (data.data?.user) {
        toast('User Registered Successfully !')
        navigate('/login')
      } else {
        toast('User Registration Failed !')
      }

      return data
    },
  })

  return { registerUser }
}
