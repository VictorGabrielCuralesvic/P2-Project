import prisma from "../../utils/prisma";

export class PriceCalculationService {
    async createPriceCalculation(data: any) {
        return await prisma.priceCalculation.create({ data });
    }

    async findAllByUserId(userId: number) {
        return await prisma.priceCalculation.findMany({
            where: { userId },
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