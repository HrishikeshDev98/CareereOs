import { Navigate, Outlet } from 'react-router-dom'

import { userLoginStatus } from '@/src/hooks/userLoginStatus'

const ProtectedRoute = () => {
  const isUserLoggedIn = userLoginStatus()
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
