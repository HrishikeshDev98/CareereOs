import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as contactsController from "./contacts.controller";

const router = Router();
router.use(authenticate);

router.get("/", contactsController.listContacts);
router.post("/", contactsController.createContact);
router.get("/:id", contactsController.getContact);
router.patch("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

export default router;
