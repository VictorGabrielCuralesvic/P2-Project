import  { Router } from "express";
/* import { UserController } from "../controller/UserController"; */
import { AuthController } from "../controller/AuthController";

/* const userController = new UserController(); */
const authController = new AuthController();
export const router = Router();

// User routes
/* router.post("/createuser", userController.store);
router.get("/users", userController.index); */

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authController.validateToken);