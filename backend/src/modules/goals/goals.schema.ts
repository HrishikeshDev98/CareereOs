import { z } from "zod";
import { GoalPeriod } from "@prisma/client";

export const createGoalSchema = z.object({
  title: z.string().min(1),
  target: z.number().int().positive(),
  period: z.nativeEnum(GoalPeriod).default(GoalPeriod.WEEKLY),
});

export const updateGoalSchema = createGoalSchema.partial();

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
