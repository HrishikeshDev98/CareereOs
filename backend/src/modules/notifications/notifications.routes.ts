import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as notificationsController from "./notifications.controller";

const router = Router();
router.use(authenticate);

router.get("/", notificationsController.listNotifications);
router.patch("/read-all", notificationsController.markAllRead);
router.patch("/:id/read", notificationsController.markRead);
router.delete("/:id", notificationsController.deleteNotification);

export default router;
