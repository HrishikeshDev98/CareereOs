import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as notesController from "./notes.controller";

const router = Router();
router.use(authenticate);

router.get("/", notesController.listNotes);
router.post("/", notesController.createNote);
router.patch("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

export default router;
