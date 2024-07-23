import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class TransactionController {
    async create(req: Request, res: Response) {
        const { type, amount, date } = req.body;
        const userId = req.user?.userId;
        
        const formattedDate = new Date(date);

        console.log("ID do usuário da requisição:", userId);

        try {
            const transaction = await prisma.transaction.create({
                data: {
                    type,
                    amount,
                    date: formattedDate,
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
        const { startDate, endDate } = req.query;

        let whereClause: any = { userId };

        if (startDate && endDate) {
            whereClause.date = {
                gte: new Date(String(startDate)),
                lte: new Date(String(endDate)),
            };
        }

        try {
            const transaction = await prisma.transaction.findMany({
                where: whereClause,
            });
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching transactions" });
        }
    }

    async getBalance(req: Request, res: Response) {
        const userId = req.user?.userId;
        const { startDate, endDate } = req.query;

        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId,
                    date: {
                        gte: new Date(String(startDate)),
                        lte: new Date(String(endDate)),
                    },
                },
            });

            const totalIncome = transactions.filter((t) => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0)
            const totalExpense = transactions.filter((t) => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0)

            const balance = totalIncome - totalExpense;

            return res.status(200).json({ totalIncome, totalExpense, balance });
        } catch (error) {
            return res.status(500).json({ error: 'error calculating balance' });
        }
    }

    async getTotalRevenueByDate(req: Request, res: Response) {
        const userId = req.user?.userId;
        const date = req.query.date as string;

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        try {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);

            const totalRevenue = await prisma.sale.aggregate({
                _sum: {
                    totalValue: true
                },
                where: {
                    userId,
                    date: {
                        gte: startDate,
                        lt: endDate
                    }
                }
            });

            return res.status(200).json({ totalRevenue: totalRevenue._sum.totalValue || 0 });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error fetching total revenue" });
        }
    }
}