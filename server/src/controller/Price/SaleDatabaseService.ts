import prisma from "../../utils/prisma";

export class SaleDatabaseService {
    async createSale(data: any) {
        return await prisma.sale.create({ data });
    }
}