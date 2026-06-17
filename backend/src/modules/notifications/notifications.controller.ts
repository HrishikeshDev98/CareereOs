import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as notificationsService from "./notifications.service";
import { param } from "../../utils/params";

export const listNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await notificationsService.listNotifications(req.user!.userId));
  } catch (err) { next(err); }
};

export const markRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.markRead(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};

export const markAllRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.markAllRead(req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};

export const deleteNotification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.deleteNotification(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
