import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    async hashPassword(password: string): Promise<string> {
        return await hash(password, 8);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    generateToken(userId: string): string {
        return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    }

    validateToken(token: string): any {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}