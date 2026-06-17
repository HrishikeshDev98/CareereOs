import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as dashboardService from "./dashboard.service";

export const getSummary = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await dashboardService.getSummary(req.user!.userId));
  } catch (err) { next(err); }
};
