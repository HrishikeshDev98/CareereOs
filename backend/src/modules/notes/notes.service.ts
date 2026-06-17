import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateNoteInput, UpdateNoteInput } from "./notes.schema";

export const createNote = async (userId: string, input: CreateNoteInput) => {
  if (input.applicationId) {
    const app = await prisma.application.findFirst({ where: { id: input.applicationId, userId } });
    if (!app) throw new AppError(404, "Application not found");
  }
  if (input.contactId) {
    const contact = await prisma.contact.findFirst({ where: { id: input.contactId, userId } });
    if (!contact) throw new AppError(404, "Contact not found");
  }
  return prisma.note.create({ data: { ...input, userId } });
};

export const listNotes = async (userId: string, applicationId?: string, contactId?: string) =>
  prisma.note.findMany({
    where: { userId, ...(applicationId && { applicationId }), ...(contactId && { contactId }) },
    orderBy: { createdAt: "desc" },
  });

export const updateNote = async (id: string, userId: string, input: UpdateNoteInput) => {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) throw new AppError(404, "Note not found");
  return prisma.note.update({ where: { id }, data: input });
};

export const deleteNote = async (id: string, userId: string) => {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) throw new AppError(404, "Note not found");
  await prisma.note.delete({ where: { id } });
};
