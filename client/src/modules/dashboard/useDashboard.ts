import { useQuery } from '@tanstack/react-query'

import api from '@/lib/api'

export const useDashboard = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: () => api.get('/dashboard').then(res => res.data),
  })

  return {
    data: data?.data,
    pending: isPending,
    error: isError,
  }
}
