import { prisma } from "../../lib/prisma";
import { ApplicationStage } from "@prisma/client";

export const getSummary = async (userId: string) => {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  weekStart.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date(now);
  sevenDaysFromNow.setDate(now.getDate() + 7);

  const [
    stageBreakdown,
    totalApplications,
    appliedThisWeek,
    upcomingInterviews,
    pendingTasks,
    recentApplications,
    recentActivity,
  ] = await Promise.all([
    prisma.application.groupBy({ by: ["stage"], where: { userId }, _count: { id: true } }),
    prisma.application.count({ where: { userId } }),
    prisma.application.count({ where: { userId, appliedAt: { gte: weekStart }, stage: { notIn: ["WISHLIST", "SAVED"] } } }),
    prisma.interview.findMany({
      where: { scheduledAt: { gte: now, lte: sevenDaysFromNow }, application: { userId } },
      orderBy: { scheduledAt: "asc" },
      take: 5,
      include: { application: { select: { jobTitle: true, company: { select: { name: true } } } } },
    }),
    prisma.task.count({ where: { userId, isCompleted: false } }),
    prisma.application.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { company: { select: { name: true, logoUrl: true } } },
    }),
    prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const byStage = Object.fromEntries(
    Object.values(ApplicationStage).map((stage) => [
      stage,
      stageBreakdown.find((s) => s.stage === stage)?._count.id ?? 0,
    ])
  );

  return {
    totalApplications,
    appliedThisWeek,
    pendingTasks,
    byStage,
    upcomingInterviews,
    recentApplications,
    recentActivity,
  };
};
