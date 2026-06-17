import { z } from "zod";

export const createInterviewSchema = z.object({
  applicationId: z.string().min(1),
  type: z.string().min(1),
  scheduledAt: z.coerce.date(),
  duration: z.number().int().positive().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export const updateInterviewSchema = createInterviewSchema.omit({ applicationId: true }).partial().extend({
  result: z.string().optional(),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
export type UpdateInterviewInput = z.infer<typeof updateInterviewSchema>;
