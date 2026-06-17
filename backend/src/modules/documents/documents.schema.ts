import { z } from "zod";
import { DocumentType } from "@prisma/client";

export const uploadDocumentSchema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(DocumentType).default(DocumentType.OTHER),
  applicationId: z.string().optional(),
});

export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;
