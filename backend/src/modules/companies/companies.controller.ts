import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as companiesService from "./companies.service";
import { createCompanySchema, updateCompanySchema } from "./companies.schema";
import { AppError } from "../../middlewares/errorHandler";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createCompanySchema.parse(req.body);
    const data = await companiesService.createCompany(req.user!.userId, input);
    sendSuccess(res, data, "Company created", 201);
  } catch (err) { next(err); }
};

export const listCompanies = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await companiesService.listCompanies(req.user!.userId);
    sendSuccess(res, data, "Companies fetched");
  } catch (err) { next(err); }
};

export const getCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await companiesService.getCompany(param(req.params.id), req.user!.userId);
    sendSuccess(res, data, "Company fetched");
  } catch (err) { next(err); }
};

export const updateCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateCompanySchema.parse(req.body);
    const data = await companiesService.updateCompany(param(req.params.id), req.user!.userId, input);
    sendSuccess(res, data, "Company updated");
  } catch (err) { next(err); }
};


export const deleteCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await companiesService.deleteCompany(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Company deleted", 204);
  } catch (err) { next(err); }
};
