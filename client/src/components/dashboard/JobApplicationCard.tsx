export interface JobApplication {
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

export default JobApplicationCard
