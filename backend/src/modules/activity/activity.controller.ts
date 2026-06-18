import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as activityService from "./activity.service";
import { sendSuccess } from "../../utils/response";

export const listActivity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    sendSuccess(res, await activityService.listActivity(req.user!.userId, applicationId), "Activity fetched");
  } catch (err) { next(err); }
};
