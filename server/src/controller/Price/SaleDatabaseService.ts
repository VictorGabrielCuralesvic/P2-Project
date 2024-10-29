import prisma from "../../utils/prisma";

export class SaleDatabaseService {
    async createSale(data: any) {
        const userId = typeof data.userId === 'string' ? parseInt(data.userId, 10) : data.userId;   
        return await prisma.sale.create({ 
            data: {
                ...data,
                userId,
            } 
        });
    }
}