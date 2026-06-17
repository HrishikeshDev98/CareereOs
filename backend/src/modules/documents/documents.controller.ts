import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as documentsService from "./documents.service";
import { uploadDocumentSchema } from "./documents.schema";
import { AppError } from "../../middlewares/errorHandler";
import { param } from "../../utils/params";

export const uploadDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError(400, "No file provided");
    const input = uploadDocumentSchema.parse(req.body);
    res.status(201).json(await documentsService.uploadDocument(req.user!.userId, input, req.file.buffer));
  } catch (err) { next(err); }
};

export const listDocuments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    res.json(await documentsService.listDocuments(req.user!.userId, applicationId));
  } catch (err) { next(err); }
};

export const deleteDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await documentsService.deleteDocument(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
