import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './components/error/ErrorPage'
import NotFoundPage from './components/error/NotFoundPage'
import AuthLayout from './components/layouts/AuthLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import ProtectedRoute from './components/layouts/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import './index.css'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [{ index: true, element: <p>Dashboard</p> }],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
