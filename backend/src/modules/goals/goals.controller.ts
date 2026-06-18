import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as goalsService from "./goals.service";
import { createGoalSchema, updateGoalSchema } from "./goals.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createGoalSchema.parse(req.body);
    sendSuccess(res, await goalsService.createGoal(req.user!.userId, input), "Goal created", 201);
  } catch (err) { next(err); }
};

export const listGoals = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    sendSuccess(res, await goalsService.listGoals(req.user!.userId), "Goals fetched");
  } catch (err) { next(err); }
};

export const updateGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateGoalSchema.parse(req.body);
    sendSuccess(res, await goalsService.updateGoal(param(req.params.id), req.user!.userId, input), "Goal updated");
  } catch (err) { next(err); }
};

export const deleteGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await goalsService.deleteGoal(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Goal deleted", 204);
  } catch (err) { next(err); }
};
