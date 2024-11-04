import prisma from "../../utils/prisma";

export class PriceCalculationService {
    async createPriceCalculation(data: any) {
        return await prisma.priceCalculation.create({
            data: {
                ...data,
                userId: typeof data.userId === 'string' ? parseInt(data.userId, 10) : data.userId,
            },
        });
    }

    async findAllByUserId(userId: string | number) {
        const parsedUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId; 

        return await prisma.priceCalculation.findMany({
            where: { userId: parsedUserId },
            include: { ingredients: true },
        });
    }

    async findById(priceCalculationId: number) {
        return await prisma.priceCalculation.findUnique({
            where: { id: priceCalculationId },
            select: { suggestedPrice: true },
        });
    }
}