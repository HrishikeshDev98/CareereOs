import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as applicationsController from "./applications.controller";

const router = Router();

router.use(authenticate);

router.get("/", applicationsController.listApplications);
router.post("/", applicationsController.createApplication);
router.get("/:id", applicationsController.getApplication);
router.patch("/:id", applicationsController.updateApplication);
router.patch("/:id/stage", applicationsController.updateStage);
router.delete("/:id", applicationsController.deleteApplication);

export default router;
