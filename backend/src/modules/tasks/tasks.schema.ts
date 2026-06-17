import { z } from "zod";
import { TaskPriority } from "@prisma/client";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM),
  applicationId: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  isCompleted: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
