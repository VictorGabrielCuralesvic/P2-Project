import { Router } from "express";
import { UserController } from "../controller/Auth/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

// Rota para atualizar o perfil do usuário
router.put("/user", authMiddleware, userController.updateUser);

// Rota para buscar informações do usuário
router.get("/user", authMiddleware, userController.getUserInfo);

export default router;
