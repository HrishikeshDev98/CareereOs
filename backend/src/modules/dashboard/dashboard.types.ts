import { Prisma, ApplicationStage } from "@prisma/client";

// Derived from Prisma payloads so these types stay in lockstep with the
// exact include/select used in dashboard.service.ts — change the query and
// the compiler forces these to match.

export type UpcomingInterview = Prisma.InterviewGetPayload<{
  include: { application: { select: { jobTitle: true; company: { select: { name: true } } } } };
}>;

export type RecentApplication = Prisma.ApplicationGetPayload<{
  include: { company: { select: { name: true; logoUrl: true } } };
}>;

export type RecentActivity = Prisma.ActivityLogGetPayload<{}>;

export interface DashboardSummary {
  totalApplications: number;
  appliedThisWeek: number;
  pendingTasks: number;
  byStage: Record<ApplicationStage, number>;
  upcomingInterviews: UpcomingInterview[];
  recentApplications: RecentApplication[];
  recentActivity: RecentActivity[];
}
