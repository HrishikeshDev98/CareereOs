import { z } from "zod";
import { ApplicationStage } from "@prisma/client";

export const createApplicationSchema = z.object({
  jobTitle: z.string().min(1),
  companyId: z.string().min(1),
  jobUrl: z.string().url().optional(),
  stage: z.nativeEnum(ApplicationStage).default(ApplicationStage.WISHLIST),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  currency: z.string().default("USD"),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  description: z.string().optional(),
  source: z.string().optional(),
  appliedAt: z.coerce.date().optional(),
});

export const updateApplicationSchema = createApplicationSchema.partial();

export const updateStageSchema = z.object({
  stage: z.nativeEnum(ApplicationStage),
});

export const listApplicationsSchema = z.object({
  stage: z.nativeEnum(ApplicationStage).optional(),
  companyId: z.string().optional(),
  search: z.string().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;
export type ListApplicationsInput = z.infer<typeof listApplicationsSchema>;
