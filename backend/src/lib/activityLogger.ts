import { prisma } from "./prisma";

export const logActivity = (userId: string, action: string, applicationId?: string): void => {
  prisma.activityLog.create({ data: { userId, action, applicationId } }).catch(() => {});
};
