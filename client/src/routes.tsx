import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './components/error/ErrorPage'
import NotFoundPage from './components/error/NotFoundPage'
import AuthLayout from './components/layouts/AuthLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import ProtectedRoute from './components/layouts/ProtectedRoute'
import Applications from './pages/applications/Applications'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Calendar from './pages/calendar/Calendar'
import Companies from './pages/companies/Companies'
import Contacts from './pages/contacts/Contacts'
import DashboardPage from './pages/dashboard/DashboardPage'
import Documents from './pages/documents/Documents'
import Goals from './pages/goals/Goals'
import Notes from './pages/notes/Notes'
import Pipeline from './pages/pipeline/Pipeline'
import Profile from './pages/profile/Profile'
import Settings from './pages/settings/Settings'
import Tasks from './pages/tasks/Tasks'

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
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'applications',
            element: <Applications />,
          },
          {
            path: 'pipeline',
            element: <Pipeline />,
          },

          {
            path: 'calendar',
            element: <Calendar />,
          },

          {
            path: 'tasks',
            element: <Tasks />,
          },

          {
            path: 'goals',
            element: <Goals />,
          },

          {
            path: 'notes',
            element: <Notes />,
          },

          {
            path: 'documents',
            element: <Documents />,
          },

          {
            path: 'contacts',
            element: <Contacts />,
          },

          {
            path: 'companies',
            element: <Companies />,
          },

          {
            path: 'settings',
            element: <Settings />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
