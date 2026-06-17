import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import * as companiesController from "./companies.controller";

const router = Router();

router.use(authenticate);

router.get("/", companiesController.listCompanies);
router.post("/", companiesController.createCompany);
router.get("/:id", companiesController.getCompany);
router.patch("/:id", companiesController.updateCompany);
router.delete("/:id", companiesController.deleteCompany);

export default router;
