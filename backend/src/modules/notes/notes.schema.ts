import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string().min(1),
  applicationId: z.string().optional(),
  contactId: z.string().optional(),
}).refine((d) => !(d.applicationId && d.contactId), {
  message: "A note can only be linked to one entity at a time",
});

export const updateNoteSchema = z.object({
  content: z.string().min(1),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
