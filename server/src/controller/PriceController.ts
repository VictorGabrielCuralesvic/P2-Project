import { Request, Response } from "express";
import prisma from "../utils/prisma";

const calculateSuggestedPrice = (ingredientCosts: number, otherCosts: number, margin: number): number => {
    const totalCost = ingredientCosts + otherCosts;
    const suggestedPrice = totalCost + (totalCost * (margin / 100));
    return suggestedPrice;
  };

export class PriceController {
    async createPrice(req: Request, res: Response) {
        const { userId, productName, ingredientCosts, otherCosts, margin } = req.body;

        const suggestedPrice = calculateSuggestedPrice(ingredientCosts, otherCosts, margin);

        const priceCalculation = await prisma.priceCalculation.create({
            data: {
                userId,
                productName,
                ingredientCosts,
                otherCosts,
                margin,
                suggestedPrice
            }
        });

        res.status(201).json(priceCalculation);
    }

    async updatePriceCalculation(req: Request, res: Response) {
        const { id } = req.params;
        const { ingredientCosts, otherCosts, margin } = req.body;

        const suggestedPrice = calculateSuggestedPrice(ingredientCosts, otherCosts, margin);

        const priceCalculation = await prisma.priceCalculation.update({
            where: { id: Number(id) },
            data: {
                ingredientCosts,
                otherCosts,
                margin,
                suggestedPrice
            }
        });

        res.status(200).json(priceCalculation);
    }
}