import { Request, Response } from "express";
import { TransactionService } from "./TransactionService";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ValidationError } from "../../error/ValidationError";
import { NotFoundError } from "../../error/NotFoundError";

const transactionService = new TransactionService();    

export class TransactionController {
    create = asyncHandler(async (req: Request, res: Response) => {
        const { type, amount, date } = req.body;
        const userId = req.user?.userId;

        if (!type || !amount || !date) {
            throw new ValidationError("Tipo, valor e data são obrigatórios.");
        }

        const transaction = await transactionService.createTransaction(userId, type, amount, new Date(date));
        return res.status(201).json(transaction);
    });

    list = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { startDate, endDate } = req.query;

        const transactions = await transactionService.listTransactions(userId, startDate as string, endDate as string);

        if (!transactions.length) {
            throw new NotFoundError("Nenhuma transação encontrada para o período especificado.");
        }

        return res.status(200).json(transactions);
    });

    getBalance = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { startDate, endDate } = req.query;

        const balance = await transactionService.calculateBalance(userId, startDate as string, endDate as string);

        if (balance === null) {
            throw new NotFoundError("Não foi possível calcular o saldo para o período especificado.");
        }

        return res.status(200).json(balance);
    });

    getTotalRevenueByDate = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const date = req.query.date as string;

        if (!date) {
            throw new ValidationError("Data é obrigatória.");
        }

        const totalRevenue = await transactionService.getTotalRevenueByDate(userId, date);

        if (totalRevenue === null) {
            throw new NotFoundError("Nenhuma receita encontrada para a data especificada.");
        }

        return res.status(200).json({ totalRevenue });
    });
}