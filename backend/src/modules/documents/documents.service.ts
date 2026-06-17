import { prisma } from "../../lib/prisma";
import { cloudinary } from "../../lib/cloudinary";
import { AppError } from "../../middlewares/errorHandler";
import { UploadDocumentInput } from "./documents.schema";

export const uploadDocument = async (userId: string, input: UploadDocumentInput, fileBuffer: Buffer) => {
  if (input.applicationId) {
    const app = await prisma.application.findFirst({ where: { id: input.applicationId, userId } });
    if (!app) throw new AppError(404, "Application not found");
  }

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "careeros/documents", resource_type: "raw" },
      (err, result) => (err || !result ? reject(err) : resolve(result))
    );
    stream.end(fileBuffer);
  });

  return prisma.document.create({
    data: { name: input.name, type: input.type, url: result.secure_url, userId, applicationId: input.applicationId },
  });
};

export const listDocuments = async (userId: string, applicationId?: string) =>
  prisma.document.findMany({
    where: { userId, ...(applicationId && { applicationId }) },
    orderBy: { createdAt: "desc" },
  });

export const deleteDocument = async (id: string, userId: string) => {
  const doc = await prisma.document.findFirst({ where: { id, userId } });
  if (!doc) throw new AppError(404, "Document not found");
  await prisma.document.delete({ where: { id } });
};
