import type { JobApplication } from '@/src/components/dashboard/JobApplicationCard'

export interface DashboardData {
  totalApplications: number
  appliedThisWeek: number
  pendingTasks: number
  byStage: Record<string, number>
  upcomingInterviews: { application: JobApplication }[]
}

/** Numeric metric keys that can be surfaced in a JobStatsCard. */
export type DashboardStatKey = 'totalApplications' | 'appliedThisWeek' | 'pendingTasks'
