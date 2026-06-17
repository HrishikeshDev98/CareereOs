import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateGoalInput, UpdateGoalInput } from "./goals.schema";

const getPeriodStart = (period: "WEEKLY" | "MONTHLY"): Date => {
  const now = new Date();
  if (period === "WEEKLY") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.getFullYear(), now.getMonth(), diff);
  }
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const createGoal = async (userId: string, input: CreateGoalInput) =>
  prisma.goal.create({ data: { ...input, userId } });

export const listGoals = async (userId: string) => {
  const goals = await prisma.goal.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

  return Promise.all(
    goals.map(async (goal) => {
      const periodStart = getPeriodStart(goal.period);
      const progress = await prisma.application.count({
        where: { userId, appliedAt: { gte: periodStart }, stage: { notIn: ["WISHLIST", "SAVED"] } },
      });
      return { ...goal, progress, percentage: Math.min(100, Math.round((progress / goal.target) * 100)) };
    })
  );
};

export const updateGoal = async (id: string, userId: string, input: UpdateGoalInput) => {
  const goal = await prisma.goal.findFirst({ where: { id, userId } });
  if (!goal) throw new AppError(404, "Goal not found");
  return prisma.goal.update({ where: { id }, data: input });
};

export const deleteGoal = async (id: string, userId: string) => {
  const goal = await prisma.goal.findFirst({ where: { id, userId } });
  if (!goal) throw new AppError(404, "Goal not found");
  await prisma.goal.delete({ where: { id } });
};
