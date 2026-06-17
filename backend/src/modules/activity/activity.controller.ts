import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as activityService from "./activity.service";

export const listActivity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    res.json(await activityService.listActivity(req.user!.userId, applicationId));
  } catch (err) { next(err); }
};
