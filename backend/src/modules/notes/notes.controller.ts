import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as notesService from "./notes.service";
import { createNoteSchema, updateNoteSchema } from "./notes.schema";
import { param } from "../../utils/params";

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createNoteSchema.parse(req.body);
    res.status(201).json(await notesService.createNote(req.user!.userId, input));
  } catch (err) { next(err); }
};

export const listNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.query.applicationId as string | undefined;
    const contactId = req.query.contactId as string | undefined;
    res.json(await notesService.listNotes(req.user!.userId, applicationId, contactId));
  } catch (err) { next(err); }
};

export const updateNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateNoteSchema.parse(req.body);
    res.json(await notesService.updateNote(param(req.params.id), req.user!.userId, input));
  } catch (err) { next(err); }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await notesService.deleteNote(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
