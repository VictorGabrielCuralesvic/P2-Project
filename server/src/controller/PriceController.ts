import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class PriceController {
    async calculatePrice(req: Request, res: Response) {

        const userId = req.user.userId;
        const {productName, ingredientCosts, laborCosts, packagingCosts, indirectCosts, margin } = req.body;

        if (!ingredientCosts || !laborCosts || !indirectCosts || !margin) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios, exceto custos de pacote." });
        }

        const totalCost = ingredientCosts + laborCosts + packagingCosts + indirectCosts;

        const suggestedPrice = totalCost * (1 + (margin / 100));

        const priceCalculation = await prisma.priceCalculation.create({
            data: {
                userId,
                productName,
                ingredientCosts,
                laborCosts,
                packagingCosts,
                indirectCosts,
                margin,
                totalCost,
                suggestedPrice,
            },
        });

        return res.status(201).json(priceCalculation);
    }
}