import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as notificationsService from "./notifications.service";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const listNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    sendSuccess(res, await notificationsService.listNotifications(req.user!.userId), "Notifications fetched");
  } catch (err) { next(err); }
};

export const markRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.markRead(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Notification marked as read");
  } catch (err) { next(err); }
};

export const markAllRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.markAllRead(req.user!.userId);
    sendSuccess(res, null, "All notifications marked as read");
  } catch (err) { next(err); }
};

export const deleteNotification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notificationsService.deleteNotification(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Notification deleted", 204);
  } catch (err) { next(err); }
};
