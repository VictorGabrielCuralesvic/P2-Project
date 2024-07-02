import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
}

declare module "express-serve-static-core" {
    interface Request {
        user: JwtPayload;
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;

        console.log("token decodificado:", decoded);

        next();
    } catch (error) {
        console.error("erro ao verificar o token:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
}