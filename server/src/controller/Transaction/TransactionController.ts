import { Request, Response } from "express";
import { TransactionService } from "./TransactionService";
import { asyncHandler } from "../../middleware/asyncHandler";

const transactionService = new TransactionService();

export class TransactionController {
    create = asyncHandler(async (req: Request, res: Response) => {
        const { type, amount, date } = req.body;
        const userId = req.user?.userId;

        const transaction = await transactionService.createTransaction(userId, type, amount, new Date(date));
        return res.status(201).json(transaction);
    });

    list = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { startDate, endDate } = req.query;

        const transactions = await transactionService.listTransactions(userId, startDate as string, endDate as string);
        return res.status(200).json(transactions);
    });

    getBalance = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { startDate, endDate } = req.query;

        const balance = await transactionService.calculateBalance(userId, startDate as string, endDate as string);
        return res.status(200).json(balance);
    });

    getTotalRevenueByDate = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const date = req.query.date as string;

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        const totalRevenue = await transactionService.getTotalRevenueByDate(userId, date);
        return res.status(200).json({ totalRevenue });
    });
}