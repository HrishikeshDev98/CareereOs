import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'
import Dashboard from '@/src/components/Dashboard'
import { useDashboard } from '@/src/modules/dashboard/useDashboard'

const DashboardPage = () => {
  const { data, pending, error } = useDashboard()

  if (error) {
    toast('Error occured while fetching the data')
  }

  if (pending) {
    return (
      <div className=" animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-36" />
                <Skeleton className="h-3 w-48" />
              </div>
            ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Main Chart Card */}
          <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-4 h-[350px] flex flex-col justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-[240px] w-full rounded-md" />
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-3 h-[350px] flex flex-col justify-between">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-4 my-auto">
              {Array(3)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="p-4 md:p-8  min-h-screen transition-all duration-300 ease-in-out">
      <Dashboard data={data} />
    </main>
  )
}

export default DashboardPage
