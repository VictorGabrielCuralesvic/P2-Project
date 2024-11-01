import { Router } from "express";
import { TransactionController } from "../controller/Transaction/TransactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const transactionController = new TransactionController();
const router = Router();

router.post("/transactions", authMiddleware, transactionController.create);
router.get("/transactions", authMiddleware, transactionController.list);
router.get("/balance", authMiddleware, transactionController.getBalance);
router.get("/total-revenue-by-date", authMiddleware, transactionController.getTotalRevenueByDate);

export default router;