import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { userLoginStatus } from '@/src/hooks/userLoginStatus'

const ProtectedRoute = () => {
  const isUserLoggedIn = userLoginStatus()
  const navigate = useNavigate()

  if (!isUserLoggedIn) {
    navigate('/login')
  }

  return <Outlet />
}

export default ProtectedRoute
