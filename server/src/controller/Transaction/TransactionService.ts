import { TransactionType } from "@prisma/client";
import prisma from "../../utils/prisma";

export class TransactionService {
    async createTransaction(userId: string | number, type: string, amount: number, date: Date) {

        const parsedUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

        const transactionType = type.toUpperCase() as TransactionType

        return await prisma.transaction.create({
            data: {
                userId: parsedUserId,
                type: transactionType,
                amount,
                date,
            },
        });
    }

    async listTransactions(userId: string | number, startDate?: string, endDate?: string) {

        const parsedUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

        let whereClause: any = { userId: parsedUserId };

        if (startDate && endDate) {
            whereClause.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        return await prisma.transaction.findMany({
            where: whereClause,
        });
    }

    async calculateBalance(userId: string | number, startDate: string, endDate: string) {

        const parsedUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: parsedUserId,
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });

        const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }

    async getTotalRevenueByDate(userId: string | number, date: string) {

        const parsedUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const totalRevenue = await prisma.sale.aggregate({
            _sum: {
                totalValue: true
            },
            where: {
                userId: parsedUserId,
                date: {
                    gte: startDate,
                    lt: endDate
                }
            }
        });

        return totalRevenue._sum.totalValue || 0;
    }
}