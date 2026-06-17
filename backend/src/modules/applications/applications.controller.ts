import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as applicationsService from "./applications.service";
import {
  createApplicationSchema,
  updateApplicationSchema,
  updateStageSchema,
  listApplicationsSchema,
} from "./applications.schema";
import { param } from "../../utils/params";

export const createApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createApplicationSchema.parse(req.body);
    const application = await applicationsService.createApplication(req.user!.userId, input);
    res.status(201).json(application);
  } catch (err) { next(err); }
};

export const listApplications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = listApplicationsSchema.parse(req.query);
    const applications = await applicationsService.listApplications(req.user!.userId, filters);
    res.json(applications);
  } catch (err) { next(err); }
};

export const getApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const application = await applicationsService.getApplication(param(req.params.id), req.user!.userId);
    res.json(application);
  } catch (err) { next(err); }
};

export const updateApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateApplicationSchema.parse(req.body);
    const application = await applicationsService.updateApplication(param(req.params.id), req.user!.userId, input);
    res.json(application);
  } catch (err) { next(err); }
};

export const updateStage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateStageSchema.parse(req.body);
    const application = await applicationsService.updateStage(param(req.params.id), req.user!.userId, input);
    res.json(application);
  } catch (err) { next(err); }
};

export const deleteApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await applicationsService.deleteApplication(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
