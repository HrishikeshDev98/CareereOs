import JobStatsCard from '@/src/components/dashboard/JobStatsCard'
import type { DashboardData } from '@/src/components/dashboard/types'
import { statsConfig } from '@/src/constants/config'

const DashboardStats = ({ data }: { data: DashboardData }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map(stat => (
        <JobStatsCard key={stat.id} icon={stat.icon} stat={data?.[stat.stat]} info={stat.info} />
      ))}
    </div>
  )
}

export default DashboardStats
