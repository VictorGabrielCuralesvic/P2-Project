import { Router } from "express";
import authRoutes from "./authRoutes";
import resetPasswordRoutes from "./resetPasswordRoutes";
import transactionRoutes from "./transactionRoutes";
import priceRoutes from "./priceRoutes";
import { errorHandler } from "../middleware/errorHandler";

const router = Router();

router.use(authRoutes);
router.use(resetPasswordRoutes);
router.use(transactionRoutes);
router.use(priceRoutes);

router.use(errorHandler);

export default router;