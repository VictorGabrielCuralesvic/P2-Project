import { Router } from "express";
import { UserController } from "../controller/Auth/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

// Rota para atualizar o perfil do usuário
router.put("/user", authMiddleware, userController.updateUser);

export default router;
