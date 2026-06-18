import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import axiosInstance from '../../../axios'

interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface RegisterResponse {
  message: string
  token: string
}

interface UseRegisterReturn {
  registerUser: UseMutationResult<RegisterResponse, Error, RegisterPayload>
}

export const useRegister = (): UseRegisterReturn => {
  const registerUser = useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async ({ email, password, firstName, lastName }: RegisterPayload) => {
      const httpClient = axiosInstance()

      const { data } = await httpClient.post<RegisterResponse>('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      })

      return data
    },
  })

  return {
    registerUser,
  }
}
