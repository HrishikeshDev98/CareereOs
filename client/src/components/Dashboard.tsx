import { BsSend } from 'react-icons/bs'
import { MdTaskAlt } from 'react-icons/md'
import { TfiBag } from 'react-icons/tfi'

import JobApplicationCard, {
  type JobApplication,
} from '@/src/components/dashboard/JobApplicationCard'
import JobStatsCard from '@/src/components/dashboard/JobStatsCard'

interface DashboardData {
  totalApplications: number
  appliedThisWeek: number
  byStage: Record<string, number>
  upcomingInterviews: { application: JobApplication }[]
}

const statsConfig = [
  {
    id: 'total-applications',
    icon: <TfiBag />,
    stat: 'totalApplications',
    info: 'All Time',
  },
  {
    id: 'applied-this-week',
    icon: <BsSend />,
    stat: 'appliedThisWeek',
    info: 'Applied this week',
  },
  {
    id: 'pending-tasks',
    icon: <MdTaskAlt />,
    stat: 'pendingTasks',
    info: 'You have pending tasks',
  },
]

const Dashboard = ({ data }: { data: DashboardData }) => {
  const user = JSON.parse(localStorage.getItem('user-info') || 'null')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Welcome Back, {user?.firstName}
        </h3>
        <p className="text-sm text-gray-500 sm:text-base mt-1">
          Heres what happeing with your job search
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map(stat => {
          return <JobStatsCard icon={stat.icon} stat={data?.[stat.stat]} info={stat.info} />
        })}
      </div>
      <h3>Application by Stage</h3>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data?.byStage &&
          Object.entries(data.byStage).map(([key, value]) => (
            <div
              key={key}
              className="border-gray-200 bg-white px-3 py-2 shadow-sm border-l-3 border-gray-900 pl-3 py-1"
            >
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {key.replaceAll('_', ' ')}
              </div>
              <div className="text-xl font-bold text-gray-900 mt-0.5">{String(value)}</div>
            </div>
          ))}
      </div>

      <h3>Uppoming interviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.upcomingInterviews.map((int, index) => (
          <JobApplicationCard key={index} application={int?.application} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
