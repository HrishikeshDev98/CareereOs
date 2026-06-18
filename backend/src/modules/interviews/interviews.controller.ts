import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as interviewsService from "./interviews.service";
import { createInterviewSchema, updateInterviewSchema } from "./interviews.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createInterviewSchema.parse(req.body);
    sendSuccess(res, await interviewsService.createInterview(req.user!.userId, input), "Interview scheduled", 201);
  } catch (err) { next(err); }
};

export const listInterviews = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    sendSuccess(res, await interviewsService.listInterviews(req.user!.userId, applicationId), "Interviews fetched");
  } catch (err) { next(err); }
};

export const getInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    sendSuccess(res, await interviewsService.getInterview(param(req.params.id), req.user!.userId), "Interview fetched");
  } catch (err) { next(err); }
};

export const updateInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateInterviewSchema.parse(req.body);
    sendSuccess(res, await interviewsService.updateInterview(param(req.params.id), req.user!.userId, input), "Interview updated");
  } catch (err) { next(err); }
};

export const deleteInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await interviewsService.deleteInterview(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Interview deleted", 204);
  } catch (err) { next(err); }
};
