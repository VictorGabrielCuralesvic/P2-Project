import { Request, Response } from "express";
import { ResetPasswordService } from "./ResetPasswordService";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ValidationError } from "../../error/ValidationError";
import { NotFoundError } from "../../error/NotFoundError";

const resetPasswordService = new ResetPasswordService();

export class ResetPasswordController {
    requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            throw new ValidationError("Email é obrigatório.");
        }

        const response = await resetPasswordService.requestPasswordReset(email);

        if (!response) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        return res.status(200).json(response);
    });

    resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            throw new ValidationError("Token e nova senha são obrigatórios.");
        }

        const response = await resetPasswordService.resetPassword(token, newPassword);

        if (!response) {
            throw new ValidationError("Falha ao redefinir a senha. Verifique se o token é válido.");
        }

        return res.status(200).json(response);
    });
}