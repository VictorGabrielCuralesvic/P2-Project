import { Router } from "express";
import { ResetPasswordController } from "../controller/ResetPassword/ResetPasswordController";

const resetPasswordController = new ResetPasswordController();
const router = Router();

router.post("/request-password-reset", resetPasswordController.requestPasswordReset);
router.post("/reset-password", resetPasswordController.resetPassword);

export default router;