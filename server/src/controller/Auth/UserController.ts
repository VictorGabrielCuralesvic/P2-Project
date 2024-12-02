import { Request, Response } from "express";
import { UserService } from "./UserService";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ValidationError } from "../../error/ValidationError";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Atualizar informações do usuário
    updateUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user.userId;
        const { name, email } = req.body;

        if (!name && !email) {
            throw new ValidationError("É necessário enviar pelo menos um campo para atualizar.");
        }

        const updatedUser = await this.userService.updateUser(userId, { name, email });

        return res.status(200).json({ user: updatedUser });
    });

    // Buscar informações do usuário
    getUserInfo = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user.userId; // Obtém o userId decodificado pelo middleware
        const user = await this.userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json(user);
    });
}
