import  { Router } from "express";
/* import { UserController } from "../controller/UserController"; */
import { AuthController } from "../controller/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";
import { PriceController } from "../controller/PriceController";

/* const userController = new UserController(); */
const authController = new AuthController();
const priceController = new PriceController();
export const router = Router();

// User routes
/* router.post("/createuser", userController.store);
router.get("/users", userController.index); */

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authController.validateToken);

// routes price
router.post('/price-calculation', /* authMiddleware,  */ priceController.createPrice);
router.put('/price-calcutaions/:id', /* authMiddleware, */ priceController.updatePriceCalculation);