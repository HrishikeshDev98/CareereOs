import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'

import { router } from './routes'

import './index.css'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
