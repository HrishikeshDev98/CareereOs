import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as applicationsService from "./applications.service";
import { createApplicationSchema, updateApplicationSchema, updateStageSchema, listApplicationsSchema } from "./applications.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createApplicationSchema.parse(req.body);
    const data = await applicationsService.createApplication(req.user!.userId, input);
    sendSuccess(res, data, "Application created", 201);
  } catch (err) { next(err); }
};

export const listApplications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = listApplicationsSchema.parse(req.query);
    const data = await applicationsService.listApplications(req.user!.userId, filters);
    sendSuccess(res, data, "Applications fetched");
  } catch (err) { next(err); }
};

export const getApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await applicationsService.getApplication(param(req.params.id), req.user!.userId);
    sendSuccess(res, data, "Application fetched");
  } catch (err) { next(err); }
};

export const updateApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateApplicationSchema.parse(req.body);
    const data = await applicationsService.updateApplication(param(req.params.id), req.user!.userId, input);
    sendSuccess(res, data, "Application updated");
  } catch (err) { next(err); }
};

export const updateStage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateStageSchema.parse(req.body);
    const data = await applicationsService.updateStage(param(req.params.id), req.user!.userId, input);
    sendSuccess(res, data, "Stage updated");
  } catch (err) { next(err); }
};

export const deleteApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await applicationsService.deleteApplication(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Application deleted", 204);
  } catch (err) { next(err); }
};
