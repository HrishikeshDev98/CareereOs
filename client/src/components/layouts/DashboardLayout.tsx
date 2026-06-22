import { Outlet } from 'react-router-dom'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from '../navigation/app-sidebar'

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div>
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
