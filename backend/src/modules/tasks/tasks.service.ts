import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateTaskInput, UpdateTaskInput } from "./tasks.schema";

export const createTask = async (userId: string, input: CreateTaskInput) => {
  if (input.applicationId) {
    const application = await prisma.application.findFirst({ where: { id: input.applicationId, userId } });
    if (!application) throw new AppError(404, "Application not found");
  }
  return prisma.task.create({ data: { ...input, userId } });
};

export const listTasks = async (userId: string, applicationId?: string, isCompleted?: boolean) =>
  prisma.task.findMany({
    where: {
      userId,
      ...(applicationId !== undefined && { applicationId }),
      ...(isCompleted !== undefined && { isCompleted }),
    },
    orderBy: [{ isCompleted: "asc" }, { dueDate: "asc" }],
    include: { application: { select: { id: true, jobTitle: true, company: { select: { name: true } } } } },
  });

export const updateTask = async (id: string, userId: string, input: UpdateTaskInput) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new AppError(404, "Task not found");
  return prisma.task.update({ where: { id }, data: input });
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new AppError(404, "Task not found");
  await prisma.task.delete({ where: { id } });
};
