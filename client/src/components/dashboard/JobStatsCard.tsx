import type { ReactNode } from 'react'

const JobStatsCard = ({ info, icon, stat }: { info: string; icon: ReactNode; stat: number }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md">
      <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900">{stat}</p>
        <p className="text-xs font-medium text-gray-500">{info}</p>
      </div>
    </div>
  )
}

export default JobStatsCard
