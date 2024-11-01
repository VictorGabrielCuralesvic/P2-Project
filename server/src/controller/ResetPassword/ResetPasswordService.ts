import prisma from "../../utils/prisma";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../../utils/emailService";

export class ResetPasswordService {
    async requestPasswordReset(email: string) {
        if (!email) {
            throw new Error("Email is required");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        await sendPasswordResetEmail(email, token);

        return { message: "Password reset email sent" };
    }

    async resetPassword(token: string, newPassword: string) {
        if (!token || !newPassword) {
            throw new Error("Token and new password are required");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
            const email = decoded.email;

            const hashedPassword = await hash(newPassword, 8);

            await prisma.user.update({
                where: { email },
                data: { password: hashedPassword },
            });

            return { message: "Password reset successful" };
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}