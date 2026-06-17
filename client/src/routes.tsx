import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './components/error/ErrorPage'
import NotFoundPage from './components/error/NotFoundPage'
import AuthLayout from './components/layouts/AuthLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import ProtectedRoute from './components/layouts/ProtectedRoute'

import './index.css'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <></>,
      },
      {
        path: '',
        element: <p></p>,
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
