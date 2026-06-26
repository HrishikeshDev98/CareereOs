const DashboardHeader = ({ firstName }: { firstName?: string }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Welcome Back, {firstName}
      </h3>
      <p className="text-sm text-gray-500 sm:text-base mt-1">
        Heres what happeing with your job search
      </p>
    </div>
  )
}

export default DashboardHeader
