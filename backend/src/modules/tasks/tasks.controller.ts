import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as tasksService from "./tasks.service";
import { createTaskSchema, updateTaskSchema } from "./tasks.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createTaskSchema.parse(req.body);
    sendSuccess(res, await tasksService.createTask(req.user!.userId, input), "Task created", 201);
  } catch (err) { next(err); }
};

export const listTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    const isCompleted = req.query.isCompleted !== undefined ? req.query.isCompleted === "true" : undefined;
    sendSuccess(res, await tasksService.listTasks(req.user!.userId, applicationId, isCompleted), "Tasks fetched");
  } catch (err) { next(err); }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateTaskSchema.parse(req.body);
    sendSuccess(res, await tasksService.updateTask(param(req.params.id), req.user!.userId, input), "Task updated");
  } catch (err) { next(err); }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await tasksService.deleteTask(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Task deleted", 204);
  } catch (err) { next(err); }
};
