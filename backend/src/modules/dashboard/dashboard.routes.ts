import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as dashboardController from "./dashboard.controller";

const router = Router();
router.use(authenticate);

router.get("/", dashboardController.getSummary);

export default router;
