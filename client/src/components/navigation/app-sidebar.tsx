import { FaRegBuilding } from 'react-icons/fa'
import {
  FiBriefcase,
  FiCalendar,
  FiCheckSquare,
  FiColumns,
  FiEdit3,
  FiFileText,
  FiHome,
  FiLogOut,
  FiSettings,
  FiTarget,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-lg font-semibold">Career OS</h1>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="h-full ">
          {sidebarItems.map(item => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link to={item.href} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />

                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center gap-3">
                <FiSettings className="h-4 w-4 shrink-0" />

                <span className="text-sm font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/profile" className="flex items-center gap-3">
                <FiUser className="h-4 w-4 shrink-0" />

                <span className="text-sm font-medium">Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex w-full items-center gap-3">
                <FiLogOut className="h-4 w-4 shrink-0" />

                <span className="text-sm font-medium">Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
