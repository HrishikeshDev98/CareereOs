import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as tasksController from "./tasks.controller";

const router = Router();
router.use(authenticate);

router.get("/", tasksController.listTasks);
router.post("/", tasksController.createTask);
router.patch("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

export default router;
