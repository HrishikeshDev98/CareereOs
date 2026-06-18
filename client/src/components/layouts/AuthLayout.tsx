import { Navigate, Outlet } from 'react-router-dom'

import { userLoginStatus } from '@/src/hooks/userLoginStatus'

const AuthLayout = () => {
  const token = userLoginStatus()

  return token ? <Navigate to="/" /> : <Outlet />
}

export default AuthLayout
