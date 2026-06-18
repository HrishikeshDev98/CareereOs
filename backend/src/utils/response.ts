import { Response } from "express";

export const sendSuccess = (res: Response, data: unknown, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({ status: "success", message, data });
};

export const sendError = (res: Response, message: string, statusCode = 500, data: unknown = null) => {
  res.status(statusCode).json({ status: "failure", message, data });
};
