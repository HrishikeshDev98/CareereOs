import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as companiesService from "./companies.service";
import { createCompanySchema, updateCompanySchema } from "./companies.schema";
import { param } from "../../utils/params";

export const createCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createCompanySchema.parse(req.body);
    const company = await companiesService.createCompany(req.user!.userId, input);
    res.status(201).json(company);
  } catch (err) { next(err); }
};

export const listCompanies = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const companies = await companiesService.listCompanies(req.user!.userId);
    res.json(companies);
  } catch (err) { next(err); }
};

export const getCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const company = await companiesService.getCompany(param(req.params.id), req.user!.userId);
    res.json(company);
  } catch (err) { next(err); }
};

export const updateCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateCompanySchema.parse(req.body);
    const company = await companiesService.updateCompany(param(req.params.id), req.user!.userId, input);
    res.json(company);
  } catch (err) { next(err); }
};

export const deleteCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await companiesService.deleteCompany(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
