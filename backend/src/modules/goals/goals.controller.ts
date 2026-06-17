import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as goalsService from "./goals.service";
import { createGoalSchema, updateGoalSchema } from "./goals.schema";
import { param } from "../../utils/params";

export const createGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createGoalSchema.parse(req.body);
    res.status(201).json(await goalsService.createGoal(req.user!.userId, input));
  } catch (err) { next(err); }
};

export const listGoals = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await goalsService.listGoals(req.user!.userId));
  } catch (err) { next(err); }
};

export const updateGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateGoalSchema.parse(req.body);
    res.json(await goalsService.updateGoal(param(req.params.id), req.user!.userId, input));
  } catch (err) { next(err); }
};

export const deleteGoal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await goalsService.deleteGoal(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
