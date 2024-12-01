import { Request, Response } from "express";
import { PriceService } from "./PriceService";
import { SaleService } from "./SaleService";
import { PriceCalculationService } from "./PriceCalculationService";
import { SaleDatabaseService } from "./SaleDatabaseService";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ValidationError } from "../../error/ValidationError";
import { NotFoundError } from "../../error/NotFoundError";
import { TransactionService } from "../Transaction/TransactionService";

export class PriceController {
    private priceService: PriceService;
    private saleService: SaleService;
    private priceCalculationService: PriceCalculationService;
    private saleDatabaseService: SaleDatabaseService;
    private transactionService: TransactionService;

    constructor() {
        this.priceService = new PriceService();
        this.saleService = new SaleService();
        this.priceCalculationService = new PriceCalculationService();
        this.saleDatabaseService = new SaleDatabaseService();
        this.transactionService = new TransactionService();
    }

    calculatePrice = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { productName, ingredients, laborCosts, packagingCosts, indirectCosts, margin } = req.body;

        if (!ingredients || !laborCosts || !indirectCosts || !margin) {
            throw new ValidationError("Todos os campos são obrigatórios, exceto custos de pacote.");
        }

        const ingredientCosts = this.priceService.calculateIngredientCosts(ingredients);
        const totalCost = this.priceService.calculateTotalCost(ingredientCosts, laborCosts, packagingCosts, indirectCosts);
        const suggestedPrice = this.priceService.calculateSuggestedPrice(totalCost, margin);

        const priceCalculation = await this.priceCalculationService.createPriceCalculation({
            userId,
            productName,
            ingredientCosts,
            laborCosts,
            packagingCosts,
            indirectCosts,
            margin,
            totalCost,
            suggestedPrice,
            ingredients: {
                create: ingredients.map((ingredient: any) => ({
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    price: ingredient.price,
                    usedQuantity: ingredient.usedQuantity,
                })),
            },
        });

        await this.transactionService.createTransaction(
            userId,
            'EXPENSE',
            totalCost,
            new Date()
        );

        return res.status(201).json(priceCalculation);
    });

    getProducts = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const products = await this.priceCalculationService.findAllByUserId(userId);
        return res.status(200).json(products);
    });

    registerSale = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const { priceCalculationId, quantity, date } = req.body;

        if (!priceCalculationId || !quantity || !date) {
            throw new ValidationError("Todos os campos são obrigatórios.");
        }

        const priceCalculation = await this.priceCalculationService.findById(priceCalculationId);

        if (!priceCalculation) {
            throw new NotFoundError("Cálculo de preço não encontrado.");
        }

        const totalValue = this.saleService.calculateTotalValue(priceCalculation.suggestedPrice, quantity);

        const sale = await this.saleDatabaseService.createSale({
            userId,
            priceCalculationId,
            quantity,
            totalValue,
            date: new Date(date),
        });

        return res.status(201).json(sale);
    });
}