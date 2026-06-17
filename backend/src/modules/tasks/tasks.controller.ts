import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as tasksService from "./tasks.service";
import { createTaskSchema, updateTaskSchema } from "./tasks.schema";
import { param } from "../../utils/params";

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createTaskSchema.parse(req.body);
    res.status(201).json(await tasksService.createTask(req.user!.userId, input));
  } catch (err) { next(err); }
};

export const listTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    const isCompleted = req.query.isCompleted !== undefined ? req.query.isCompleted === "true" : undefined;
    res.json(await tasksService.listTasks(req.user!.userId, applicationId, isCompleted));
  } catch (err) { next(err); }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateTaskSchema.parse(req.body);
    res.json(await tasksService.updateTask(param(req.params.id), req.user!.userId, input));
  } catch (err) { next(err); }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await tasksService.deleteTask(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
