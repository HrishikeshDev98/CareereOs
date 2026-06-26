import type { ReactNode } from 'react'
import { BsSend } from 'react-icons/bs'
import { MdTaskAlt } from 'react-icons/md'
import { TfiBag } from 'react-icons/tfi'

interface JobApplication {
  id: string
  jobTitle: string
  jobUrl: string | null
  stage: string
  salaryMin: number | null
  salaryMax: number | null
  currency: string
  location: string | null
  isRemote: boolean
  appliedAt: string
  company: {
    name: string
    logoUrl: string | null
  }
}

const JobApplicationCard = ({ application }: { application: JobApplication }) => {
  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const getStageStyles = (stage: string) => {
    switch (stage?.toUpperCase()) {
      case 'OFFER':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'INTERVIEW':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className=" overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Company Logo or Placeholder Letter */}
        <div className="flex items-center gap-3">
          {application?.company?.logoUrl ? (
            <img
              src={application?.company.logoUrl}
              alt={`${application?.company?.name} logo`}
              className="h-11 w-11 rounded-lg object-contain border border-gray-100"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-700 border border-gray-200">
              {application?.company?.name.charAt(0)}
            </div>
          )}

          {/* Job & Company Info */}
          <div>
            <h4 className="font-semibold text-gray-900 leading-tight">{application?.jobTitle}</h4>
            <p className="text-sm font-medium text-gray-500 mt-0.5">{application?.company?.name}</p>
          </div>
        </div>

        {/* Pure Tailwind Status Badge */}
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getStageStyles(application?.stage)}`}
        >
          {application?.stage}
        </span>
      </div>

      {/* Divider Line */}
      <div className="my-4 border-t border-gray-100" />

      {/* Footer Content */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span>{application.isRemote ? 'Remote' : 'On-site'}</span>
          {application.location && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{application.location}</span>
            </>
          )}
        </div>
        <div>
          <span>Applied {formattedDate}</span>
        </div>
      </div>
    </div>
  )
}

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

const Dashboard = ({ data }: { data: any }) => {
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
        <JobStatsCard icon={<TfiBag />} stat={data?.totalApplications} info="All Time" />
        <JobStatsCard icon={<BsSend />} stat={data?.appliedThisWeek} info="Applied this week" />
        <JobStatsCard
          icon={<MdTaskAlt />}
          stat={data?.appliedThisWeek}
          info="You have pending tasks"
        />
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
        <>
          {data?.upcomingInterviews.map(int => {
            return (
              <>
                <JobApplicationCard application={int?.application} />
              </>
            )
          })}
        </>
        <div></div>
      </div>
    </div>
  )
}

export default Dashboard
