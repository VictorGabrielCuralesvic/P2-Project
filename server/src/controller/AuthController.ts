import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        console.log(req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const userExists = await prisma.user.findUnique({ where: { email } });

            if (userExists) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashPassword = await hash(password, 8);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
                expiresIn: "1h"
            });

            return res.status(201).json({ user, token });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
                expiresIn: "1h"
            });

            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async validateToken(req: Request, res: Response) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            return res.status(200).json({ valid: true, decoded });
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }
    }
}
