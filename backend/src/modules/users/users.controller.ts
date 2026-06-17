import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as usersService from "./users.service";
import { updateProfileSchema } from "./users.schema";
import { AppError } from "../../middlewares/errorHandler";

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getProfile(req.user!.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateProfileSchema.parse(req.body);
    const user = await usersService.updateProfile(req.user!.userId, input);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const uploadAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError(400, "No file provided");
    const user = await usersService.uploadAvatar(req.user!.userId, req.file.buffer, req.file.mimetype);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const uploadResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError(400, "No file provided");
    const user = await usersService.uploadResume(req.user!.userId, req.file.buffer);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await usersService.deleteAccount(req.user!.userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
