import { Router } from "express";
import { checkEligibleStatement } from "../controllers/ai.controller.js";

const aiRoutes = Router();

aiRoutes.post('/statement',checkEligibleStatement)

export default aiRoutes;