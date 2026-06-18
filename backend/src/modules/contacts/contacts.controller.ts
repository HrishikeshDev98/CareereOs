import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authenticate";
import * as contactsService from "./contacts.service";
import { createContactSchema, updateContactSchema } from "./contacts.schema";
import { sendSuccess } from "../../utils/response";
import { param } from "../../utils/params";

export const createContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = createContactSchema.parse(req.body);
    sendSuccess(res, await contactsService.createContact(req.user!.userId, input), "Contact created", 201);
  } catch (err) { next(err); }
};

export const listContacts = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const companyId = req.query.companyId as string | undefined;
    sendSuccess(res, await contactsService.listContacts(req.user!.userId, companyId), "Contacts fetched");
  } catch (err) { next(err); }
};

export const getContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    sendSuccess(res, await contactsService.getContact(param(req.params.id), req.user!.userId), "Contact fetched");
  } catch (err) { next(err); }
};

export const updateContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const input = updateContactSchema.parse(req.body);
    sendSuccess(res, await contactsService.updateContact(param(req.params.id), req.user!.userId, input), "Contact updated");
  } catch (err) { next(err); }
};

export const deleteContact = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await contactsService.deleteContact(param(req.params.id), req.user!.userId);
    sendSuccess(res, null, "Contact deleted", 204);
  } catch (err) { next(err); }
};
