import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { logActivity } from "../../lib/activityLogger";
import {
  CreateApplicationInput,
  UpdateApplicationInput,
  UpdateStageInput,
  ListApplicationsInput,
} from "./applications.schema";

const applicationInclude = {
  company: { select: { id: true, name: true, logoUrl: true } },
  _count: { select: { interviews: true, tasks: true, notes: true } },
} satisfies Prisma.ApplicationInclude;

export const createApplication = async (userId: string, input: CreateApplicationInput) => {
  const company = await prisma.company.findFirst({ where: { id: input.companyId, userId } });
  if (!company) throw new AppError(404, "Company not found");

  const application = await prisma.application.create({
    data: { ...input, userId },
    include: applicationInclude,
  });

  logActivity(userId, `Added ${application.jobTitle} at ${company.name} to ${input.stage}`, application.id);
  return application;
};

export const listApplications = async (userId: string, filters: ListApplicationsInput) => {
  const where: Prisma.ApplicationWhereInput = {
    userId,
    ...(filters.stage && { stage: filters.stage }),
    ...(filters.companyId && { companyId: filters.companyId }),
    ...(filters.search && { jobTitle: { contains: filters.search, mode: "insensitive" } }),
  };

  return prisma.application.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: applicationInclude,
  });
};

export const getApplication = async (id: string, userId: string) => {
  const application = await prisma.application.findFirst({
    where: { id, userId },
    include: {
      company: true,
      interviews: { orderBy: { scheduledAt: "asc" } },
      tasks: { orderBy: { dueDate: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
      documents: true,
    },
  });
  if (!application) throw new AppError(404, "Application not found");
  return application;
};

export const updateApplication = async (id: string, userId: string, input: UpdateApplicationInput) => {
  const existing = await prisma.application.findFirst({ where: { id, userId } });
  if (!existing) throw new AppError(404, "Application not found");

  return prisma.application.update({ where: { id }, data: input, include: applicationInclude });
};

export const updateStage = async (id: string, userId: string, input: UpdateStageInput) => {
  const existing = await prisma.application.findFirst({ where: { id, userId }, include: { company: true } });
  if (!existing) throw new AppError(404, "Application not found");

  const application = await prisma.application.update({
    where: { id },
    data: {
      stage: input.stage,
      ...(input.stage === "APPLIED" && !existing.appliedAt ? { appliedAt: new Date() } : {}),
    },
    include: applicationInclude,
  });

  logActivity(userId, `Moved ${existing.jobTitle} at ${existing.company.name} to ${input.stage}`, id);
  return application;
};

export const deleteApplication = async (id: string, userId: string) => {
  const existing = await prisma.application.findFirst({ where: { id, userId } });
  if (!existing) throw new AppError(404, "Application not found");
  await prisma.application.delete({ where: { id } });
};
