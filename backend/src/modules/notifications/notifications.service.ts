import { prisma } from "../../lib/prisma";

export const listNotifications = async (userId: string) =>
  prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 });

export const markRead = async (id: string, userId: string) =>
  prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } });

export const markAllRead = async (userId: string) =>
  prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });

export const deleteNotification = async (id: string, userId: string) => {
  await prisma.notification.deleteMany({ where: { id, userId } });
};

export const createNotification = async (userId: string, message: string, link?: string) =>
  prisma.notification.create({ data: { userId, message, link } });
