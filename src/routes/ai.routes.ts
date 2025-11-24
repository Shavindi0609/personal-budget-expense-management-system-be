import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { analyzeExpenses } from "../controllers/ai.controller";

const router = Router();

router.use(authenticate);
router.post("/analyze", analyzeExpenses);

export default router;
