import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import { avatarUpload, resumeUpload } from "../../lib/upload";
import * as usersController from "./users.controller";

const router = Router();

router.use(authenticate);

router.get("/me", usersController.getMe);
router.patch("/me", usersController.updateMe);
router.post("/me/avatar", avatarUpload.single("avatar"), usersController.uploadAvatar);
router.post("/me/resume", resumeUpload.single("resume"), usersController.uploadResume);
router.delete("/me", usersController.deleteMe);

export default router;
