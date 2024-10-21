import { Router } from "express";
import { AuthController } from "../controller/Auth/AuthController";

const authController = new AuthController();
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authController.validateToken);

export default router;