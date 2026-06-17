import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as interviewsService from "./interviews.service";
import { createInterviewSchema, updateInterviewSchema } from "./interviews.schema";
import { param } from "../../utils/params";

export const createInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createInterviewSchema.parse(req.body);
    res.status(201).json(await interviewsService.createInterview(req.user!.userId, input));
  } catch (err) { next(err); }
};

export const listInterviews = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    res.json(await interviewsService.listInterviews(req.user!.userId, applicationId));
  } catch (err) { next(err); }
};

export const getInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await interviewsService.getInterview(param(req.params.id), req.user!.userId));
  } catch (err) { next(err); }
};

export const updateInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateInterviewSchema.parse(req.body);
    res.json(await interviewsService.updateInterview(param(req.params.id), req.user!.userId, input));
  } catch (err) { next(err); }
};

export const deleteInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await interviewsService.deleteInterview(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
