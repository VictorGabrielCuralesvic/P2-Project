import { Router } from "express";
import { PriceController } from "../controller/Price/PriceController";
import { authMiddleware } from "../middleware/authMiddleware";

const priceController = new PriceController();
const router = Router();

router.post("/calculate-price", authMiddleware, priceController.calculatePrice.bind(priceController));
router.get("/products", authMiddleware, priceController.getProducts);
router.post("/register-sale", authMiddleware, priceController.registerSale);

export default router;