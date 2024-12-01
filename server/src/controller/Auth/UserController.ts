import { Request, Response } from "express";
import { UserService } from "./UserService";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ValidationError } from "../../error/ValidationError";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    updateUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user.userId;
        const { name, email } = req.body;
    
        if (!name && !email) {
            throw new ValidationError("É necessário enviar pelo menos um campo para atualizar.");
        }
    
        const updatedUser = await this.userService.updateUser(userId, { name, email });
    
        return res.status(200).json({ user: updatedUser });
    });
    
}
