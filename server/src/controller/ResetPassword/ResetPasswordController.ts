import { Request, Response } from "express";
import { ResetPasswordService } from "./ResetPasswordService";
import { asyncHandler } from "../../middleware/asyncHandler";

const resetPasswordService = new ResetPasswordService();

export class ResetPasswordController {
    requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        const response = await resetPasswordService.requestPasswordReset(email);
        return res.status(200).json(response);
    });

    resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { token, newPassword } = req.body;

        const response = await resetPasswordService.resetPassword(token, newPassword);
        return res.status(200).json(response);
    });
}