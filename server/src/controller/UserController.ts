/* import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { hash } from "bcrypt";

export class UserController {
    async index(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            return res.json({ users });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required failed" });
        }

        try {
            const userExists = await prisma.user.findUnique({ where: { email }});

            if (userExists) {
                return res.status(400).json({ error: "User already exists" })
            }

            const hashPassword = await hash(password, 8);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });
            return res.status(201).json({ user });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
} */