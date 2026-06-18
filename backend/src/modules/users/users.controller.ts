import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as usersService from "./users.service";
import { updateProfileSchema } from "./users.schema";
import { AppError } from "../../middlewares/errorHandler";
import { sendSuccess } from "../../utils/response";

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await usersService.getProfile(req.user!.userId);
    sendSuccess(res, data, "Profile fetched");
  } catch (err) { next(err); }
};

export const updateMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateProfileSchema.parse(req.body);
    const data = await usersService.updateProfile(req.user!.userId, input);
    sendSuccess(res, data, "Profile updated");
  } catch (err) { next(err); }
};

export const uploadAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError(400, "No file provided");
    const data = await usersService.uploadAvatar(req.user!.userId, req.file.buffer, req.file.mimetype);
    sendSuccess(res, data, "Avatar uploaded");
  } catch (err) { next(err); }
};

export const uploadResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError(400, "No file provided");
    const data = await usersService.uploadResume(req.user!.userId, req.file.buffer);
    sendSuccess(res, data, "Resume uploaded");
  } catch (err) { next(err); }
};

export const deleteMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await usersService.deleteAccount(req.user!.userId);
    sendSuccess(res, null, "Account deleted", 204);
  } catch (err) { next(err); }
};
