import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateContactInput, UpdateContactInput } from "./contacts.schema";

export const createContact = async (userId: string, input: CreateContactInput) => {
  if (input.companyId) {
    const company = await prisma.company.findFirst({ where: { id: input.companyId, userId } });
    if (!company) throw new AppError(404, "Company not found");
  }
  return prisma.contact.create({ data: { ...input, userId } });
};

export const listContacts = async (userId: string, companyId?: string) =>
  prisma.contact.findMany({
    where: { userId, ...(companyId && { companyId }) },
    orderBy: { name: "asc" },
    include: { company: { select: { id: true, name: true } } },
  });

export const getContact = async (id: string, userId: string) => {
  const contact = await prisma.contact.findFirst({
    where: { id, userId },
    include: { company: true, notes: { orderBy: { createdAt: "desc" } } },
  });
  if (!contact) throw new AppError(404, "Contact not found");
  return contact;
};

export const updateContact = async (id: string, userId: string, input: UpdateContactInput) => {
  const contact = await prisma.contact.findFirst({ where: { id, userId } });
  if (!contact) throw new AppError(404, "Contact not found");
  return prisma.contact.update({ where: { id }, data: input });
};

export const deleteContact = async (id: string, userId: string) => {
  const contact = await prisma.contact.findFirst({ where: { id, userId } });
  if (!contact) throw new AppError(404, "Contact not found");
  await prisma.contact.delete({ where: { id } });
};
