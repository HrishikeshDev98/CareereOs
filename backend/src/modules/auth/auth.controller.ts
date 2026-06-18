import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { registerSchema, loginSchema, refreshSchema } from "./auth.schema";
import { sendSuccess } from "../../utils/response";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = registerSchema.parse(req.body);
    const data = await authService.register(input);
    sendSuccess(res, data, "Account created successfully", 201);
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = loginSchema.parse(req.body);
    const data = await authService.login(input);
    sendSuccess(res, data, "Logged in successfully");
  } catch (err) { next(err); }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const data = await authService.refresh(refreshToken);
    sendSuccess(res, data, "Token refreshed");
  } catch (err) { next(err); }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    await authService.logout(refreshToken);
    sendSuccess(res, null, "Logged out successfully", 204);
  } catch (err) { next(err); }
};
