import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as interviewsController from "./interviews.controller";

const router = Router();
router.use(authenticate);

router.get("/", interviewsController.listInterviews);
router.post("/", interviewsController.createInterview);
router.get("/:id", interviewsController.getInterview);
router.patch("/:id", interviewsController.updateInterview);
router.delete("/:id", interviewsController.deleteInterview);

export default router;
