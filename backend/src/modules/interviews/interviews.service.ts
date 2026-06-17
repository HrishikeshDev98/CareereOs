import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { logActivity } from "../../lib/activityLogger";
import { CreateInterviewInput, UpdateInterviewInput } from "./interviews.schema";

export const createInterview = async (userId: string, input: CreateInterviewInput) => {
  const application = await prisma.application.findFirst({ where: { id: input.applicationId, userId } });
  if (!application) throw new AppError(404, "Application not found");

  const interview = await prisma.interview.create({ data: input });
  logActivity(userId, `Scheduled ${input.type} interview for ${application.jobTitle}`, application.id);
  return interview;
};

export const listInterviews = async (userId: string, applicationId?: string) => {
  const applicationIds = applicationId
    ? [applicationId]
    : (await prisma.application.findMany({ where: { userId }, select: { id: true } })).map((a) => a.id);

  return prisma.interview.findMany({
    where: { applicationId: { in: applicationIds } },
    orderBy: { scheduledAt: "asc" },
    include: { application: { select: { id: true, jobTitle: true, company: { select: { name: true } } } } },
  });
};

export const getInterview = async (id: string, userId: string) => {
  const interview = await prisma.interview.findFirst({
    where: { id, application: { userId } },
    include: { application: { select: { id: true, jobTitle: true, company: { select: { name: true } } } } },
  });
  if (!interview) throw new AppError(404, "Interview not found");
  return interview;
};

export const updateInterview = async (id: string, userId: string, input: UpdateInterviewInput) => {
  const interview = await prisma.interview.findFirst({ where: { id, application: { userId } } });
  if (!interview) throw new AppError(404, "Interview not found");
  return prisma.interview.update({ where: { id }, data: input });
};

export const deleteInterview = async (id: string, userId: string) => {
  const interview = await prisma.interview.findFirst({ where: { id, application: { userId } } });
  if (!interview) throw new AppError(404, "Interview not found");
  await prisma.interview.delete({ where: { id } });
};
