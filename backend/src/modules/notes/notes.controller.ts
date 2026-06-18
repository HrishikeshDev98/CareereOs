import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as notesService from "./notes.service";
import { createNoteSchema, updateNoteSchema } from "./notes.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createNoteSchema.parse(req.body);
    sendSuccess(res, await notesService.createNote(req.user!.userId, input), "Note created", 201);
  } catch (err) { next(err); }
};

export const listNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    const contactId = req.query.contactId as string | undefined;
    sendSuccess(res, await notesService.listNotes(req.user!.userId, applicationId, contactId), "Notes fetched");
  } catch (err) { next(err); }
};

export const updateNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateNoteSchema.parse(req.body);
    sendSuccess(res, await notesService.updateNote(param(req.params.id), req.user!.userId, input), "Note updated");
  } catch (err) { next(err); }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notesService.deleteNote(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Note deleted", 204);
  } catch (err) { next(err); }
};
