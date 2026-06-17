import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as goalsController from "./goals.controller";

const router = Router();
router.use(authenticate);

router.get("/", goalsController.listGoals);
router.post("/", goalsController.createGoal);
router.patch("/:id", goalsController.updateGoal);
router.delete("/:id", goalsController.deleteGoal);

export default router;
