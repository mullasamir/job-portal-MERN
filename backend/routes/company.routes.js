import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, resgisterCompany, updataCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register-company").post(isAuthenticated,resgisterCompany);
router.route("/get-companies").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,updataCompany);

export default router;