import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class TransactionController {
    async create(req: Request, res: Response) {
        const { type, amount, category, notes, date } = req.body;
        const userId = req.user?.userId;

        console.log("ID do usuário da requisição:", userId);

        try {
            const transaction = await prisma.transaction.create({
                data: {
                    type,
                    amount,
                    category,
                    notes,
                    date,
                    userId,
                },
            });
            return res.status(201).json(transaction);
        } catch (error) {
            console.log(userId);
            console.error(error);
            return res.status(500).json({ error: "Error creating transaction" });
        }
    }

    async list(req: Request, res: Response) {

        const userId = req.user?.userId;

        try {
            const transaction = await prisma.transaction.findMany({
                where: {
                    userId
                },
            });
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching transactions" });
        }
    }
}