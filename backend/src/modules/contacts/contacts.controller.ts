import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as contactsService from "./contacts.service";
import { createContactSchema, updateContactSchema } from "./contacts.schema";
import { param } from "../../utils/params";

export const createContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createContactSchema.parse(req.body);
    res.status(201).json(await contactsService.createContact(req.user!.userId, input));
  } catch (err) { next(err); }
};

export const listContacts = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const companyId = req.query.companyId as string | undefined;
    res.json(await contactsService.listContacts(req.user!.userId, companyId));
  } catch (err) { next(err); }
};

export const getContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await contactsService.getContact(param(req.params.id), req.user!.userId));
  } catch (err) { next(err); }
};

export const updateContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateContactSchema.parse(req.body);
    res.json(await contactsService.updateContact(param(req.params.id), req.user!.userId, input));
  } catch (err) { next(err); }
};

export const deleteContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await contactsService.deleteContact(param(req.params.id), req.user!.userId);
    res.status(204).send();
  } catch (err) { next(err); }
};
