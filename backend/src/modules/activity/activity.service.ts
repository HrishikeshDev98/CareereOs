import { prisma } from "../../lib/prisma";

export const listActivity = async (userId: string, applicationId?: string) =>
  prisma.activityLog.findMany({
    where: { userId, ...(applicationId && { applicationId }) },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { application: { select: { id: true, jobTitle: true, company: { select: { name: true } } } } },
  });
