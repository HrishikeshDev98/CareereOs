import ApplicationsByStage from '@/src/components/dashboard/ApplicationsByStage'
import DashboardHeader from '@/src/components/dashboard/DashboardHeader'
import DashboardStats from '@/src/components/dashboard/DashboardStats'
import type { DashboardData } from '@/src/components/dashboard/types'
import UpcomingInterviews from '@/src/components/dashboard/UpcomingInterviews'

const Dashboard = ({ data }: { data: DashboardData }) => {
  const user = JSON.parse(localStorage.getItem('user-info') || 'null')

  return (
    <div className="space-y-6">
      <DashboardHeader firstName={user?.firstName} />
      <DashboardStats data={data} />
      <ApplicationsByStage byStage={data?.byStage} />
      <UpcomingInterviews interviews={data?.upcomingInterviews} />
    </div>
  )
}

export default Dashboard
