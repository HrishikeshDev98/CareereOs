import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as activityController from "./activity.controller";

const router = Router();
router.use(authenticate);

router.get("/", activityController.listActivity);

export default router;
