import { FaRegBuilding } from 'react-icons/fa'
import {
  FiBriefcase,
  FiCalendar,
  FiCheckSquare,
  FiColumns,
  FiEdit3,
  FiFileText,
  FiHome,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'

export const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: FiHome,
  },
  {
    id: 'applications',
    label: 'Applications',
    href: '/applications',
    icon: FiBriefcase,
  },
  {
    id: 'pipeline',
    label: 'Pipeline (Kanban)',
    href: '/pipeline',
    icon: FiColumns,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    href: '/calendar',
    icon: FiCalendar,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    href: '/tasks',
    icon: FiCheckSquare,
  },
  {
    id: 'goals',
    label: 'Goals',
    href: '/goals',
    icon: FiTarget,
  },
  {
    id: 'notes',
    label: 'Notes',
    href: '/notes',
    icon: FiEdit3,
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/documents',
    icon: FiFileText,
  },
  {
    id: 'contacts',
    label: 'Contacts',
    href: '/contacts',
    icon: FiUsers,
  },
  {
    id: 'companies',
    label: 'Companies',
    href: '/companies',
    icon: FaRegBuilding,
  },
]
