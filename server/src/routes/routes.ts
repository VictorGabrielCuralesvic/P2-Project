import  { Router } from "express";
/* import { UserController } from "../controller/UserController"; */
import { AuthController } from "../controller/AuthController";
import { ResetPasswordController } from "../controller/ResetPasswordController";
import { TransactionController } from "../controller/TransactionController";
import { authMiddleware } from "../middleware/authMiddleware";

/* const userController = new UserController(); */
const authController = new AuthController();
const resetPasswordController = new ResetPasswordController();
const transactionController = new TransactionController();
export const router = Router();

// User routes
/* router.post("/createuser", userController.store);
router.get("/users", userController.index); */

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authController.validateToken);

// Reset Passwords routes
router.post("/request-password-reset", resetPasswordController.requestPasswordReset);
router.post("/reset-password", resetPasswordController.resetPassword);

// Transaction routes
router.post("/transactions", authMiddleware, transactionController.create);
router.get("/transactions", authMiddleware, transactionController.list);