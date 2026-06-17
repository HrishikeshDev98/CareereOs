import { prisma } from "../../lib/prisma";
import { AppError } from "../../middlewares/errorHandler";
import { CreateCompanyInput, UpdateCompanyInput } from "./companies.schema";

export const createCompany = async (userId: string, input: CreateCompanyInput) => {
  const existing = await prisma.company.findUnique({ where: { userId_name: { userId, name: input.name } } });
  if (existing) throw new AppError(409, "You already have a company with that name");

  return prisma.company.create({ data: { ...input, userId } });
};

export const listCompanies = async (userId: string) =>
  prisma.company.findMany({
    where: { userId },
    orderBy: { name: "asc" },
    include: { _count: { select: { applications: true, contacts: true } } },
  });

export const getCompany = async (id: string, userId: string) => {
  const company = await prisma.company.findFirst({
    where: { id, userId },
    include: { applications: { orderBy: { createdAt: "desc" } }, contacts: true },
  });
  if (!company) throw new AppError(404, "Company not found");
  return company;
};

export const updateCompany = async (id: string, userId: string, input: UpdateCompanyInput) => {
  const company = await prisma.company.findFirst({ where: { id, userId } });
  if (!company) throw new AppError(404, "Company not found");

  return prisma.company.update({ where: { id }, data: input });
};

export const deleteCompany = async (id: string, userId: string) => {
  const company = await prisma.company.findFirst({ where: { id, userId } });
  if (!company) throw new AppError(404, "Company not found");

  await prisma.company.delete({ where: { id } });
};
