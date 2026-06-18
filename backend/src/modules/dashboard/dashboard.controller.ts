import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as dashboardService from "./dashboard.service";
import { sendSuccess } from "../../utils/response";

export const getSummary = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    sendSuccess(res, await dashboardService.getSummary(req.user!.userId), "Dashboard fetched");
  } catch (err) { next(err); }
};
