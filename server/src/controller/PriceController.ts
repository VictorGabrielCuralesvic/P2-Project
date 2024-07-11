import { Ingredient } from './../../node_modules/.prisma/client/index.d';
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class PriceController {
    async calculatePrice(req: Request, res: Response) {

        const userId = req.user.userId;
        const {productName, ingredients, laborCosts, packagingCosts, indirectCosts, margin } = req.body;

        if (!ingredients || !laborCosts || !indirectCosts || !margin) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios, exceto custos de pacote." });
        }

        const ingredientCosts = ingredients.reduce((sum: number, ingredient: { price: number; quantity: number; usedQuantity: number; }) => {
            const proportionalCost = (ingredient.price / ingredient.quantity) * ingredient.usedQuantity;
            return sum + proportionalCost;
        }, 0);


        const totalCost = ingredientCosts + laborCosts + packagingCosts + indirectCosts;

        const suggestedPrice = parseFloat((totalCost * (1 + (margin / 100))).toFixed(1));

        const priceCalculation = await prisma.priceCalculation.create({
            data: {
                userId,
                productName,
                ingredientCosts: parseFloat(ingredientCosts),
                laborCosts: parseFloat(laborCosts),
                packagingCosts: parseFloat(packagingCosts),
                indirectCosts: parseFloat(indirectCosts),
                margin: parseFloat(margin),
                totalCost,
                suggestedPrice,
                ingredients: {
                    create: ingredients.map((ingredient: { name: any; quantity: any; price: any; usedQuantity: any; }) => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        price: ingredient.price,
                        usedQuantity: ingredient.usedQuantity
                    }))
                }
            },
        });

        return res.status(201).json(priceCalculation);
    }

    async getProducts(req: Request, res: Response) {
        const userId = req.user.userId;

        try {
            const products = await prisma.priceCalculation.findMany({
                where: { userId },
                include: {
                    ingredients: true
                }
            });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar produtos"});
        }
    }
}