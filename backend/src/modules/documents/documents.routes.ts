import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import multer from "multer";
import * as documentsController from "./documents.controller";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();
router.use(authenticate);

router.get("/", documentsController.listDocuments);
router.post("/", upload.single("file"), documentsController.uploadDocument);
router.delete("/:id", documentsController.deleteDocument);

export default router;
