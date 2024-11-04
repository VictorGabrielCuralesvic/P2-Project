import { PriceController } from "../controller/Price/PriceController";
import { PriceService } from "../controller/Price/PriceService";
import { SaleService } from "../controller/Price/SaleService";
import { PriceCalculationService } from "../controller/Price/PriceCalculationService";
import { SaleDatabaseService } from "../controller/Price/SaleDatabaseService";
import { ValidationError } from "../error/ValidationError";
import { NotFoundError } from "../error/AuthenticationError";

jest.mock("../controller/Price/PriceService");
jest.mock("../controller/Price/SaleService");
jest.mock("../controller/Price/PriceCalculationService");
jest.mock("../controller/Price/SaleDatabaseService");

describe("PriceController", () => {
    let priceController;
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();

    beforeEach(() => {
        priceController = new PriceController();
        mockRequest = {
            user: { userId: 1 },
            body: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe("calculatePrice", () => {
        it("should calculate price and return price calculation", async () => {
            mockRequest.body = {
                productName: "Product A",
                ingredients: [{ name: "Ingredient 1", quantity: 10, price: 5, usedQuantity: 5 }],
                laborCosts: 100,
                packagingCosts: 20,
                indirectCosts: 30,
                margin: 20,
            };

            const ingredientCosts = 2.5;
            const totalCost = 152.5;
            const suggestedPrice = 183;
            PriceService.prototype.calculateIngredientCosts.mockReturnValue(ingredientCosts);
            PriceService.prototype.calculateTotalCost.mockReturnValue(totalCost);
            PriceService.prototype.calculateSuggestedPrice.mockReturnValue(suggestedPrice);

            const mockPriceCalculation = { id: 1, ...mockRequest.body, totalCost, suggestedPrice };
            PriceCalculationService.prototype.createPriceCalculation.mockResolvedValue(mockPriceCalculation);

            await priceController.calculatePrice(mockRequest, mockResponse, nextFunction);

            expect(PriceService.prototype.calculateIngredientCosts).toHaveBeenCalledWith(mockRequest.body.ingredients);
            expect(PriceService.prototype.calculateTotalCost).toHaveBeenCalledWith(ingredientCosts, 100, 20, 30);
            expect(PriceService.prototype.calculateSuggestedPrice).toHaveBeenCalledWith(totalCost, 20);
            expect(PriceCalculationService.prototype.createPriceCalculation).toHaveBeenCalledWith(expect.objectContaining({
                userId: 1,
                productName: "Product A",
                ingredientCosts,
                laborCosts: 100,
                packagingCosts: 20,
                indirectCosts: 30,
                margin: 20,
                totalCost,
                suggestedPrice,
                ingredients: {
                    create: [{ name: "Ingredient 1", quantity: 10, price: 5, usedQuantity: 5 }]
                },
            }));
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockPriceCalculation);
        });

        it("should throw a ValidationError if required fields are missing", async () => {
            mockRequest.body = {
                productName: "Product A",
                ingredients: [],
                laborCosts: 100,
                indirectCosts: 30,
                margin: 20,
            };

            await expect(priceController.calculatePrice(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("getProducts", () => {
        it("should return all products for the user", async () => {
            const mockProducts = [{ id: 1, productName: "Product A" }];
            PriceCalculationService.prototype.findAllByUserId.mockResolvedValue(mockProducts);

            await priceController.getProducts(mockRequest, mockResponse, nextFunction);

            expect(PriceCalculationService.prototype.findAllByUserId).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
        });
    });

    describe("registerSale", () => {
        it("should register a sale and return sale data", async () => {
            mockRequest.body = {
                priceCalculationId: 1,
                quantity: 10,
                date: "2024-01-01",
            };

            const mockPriceCalculation = { suggestedPrice: 20 };
            PriceCalculationService.prototype.findById.mockResolvedValue(mockPriceCalculation);
            SaleService.prototype.calculateTotalValue.mockReturnValue(200);
            const mockSale = { id: 1, ...mockRequest.body, totalValue: 200 };
            SaleDatabaseService.prototype.createSale.mockResolvedValue(mockSale);

            await priceController.registerSale(mockRequest, mockResponse, nextFunction);

            expect(PriceCalculationService.prototype.findById).toHaveBeenCalledWith(1);
            expect(SaleService.prototype.calculateTotalValue).toHaveBeenCalledWith(20, 10);
            expect(SaleDatabaseService.prototype.createSale).toHaveBeenCalledWith({
                userId: 1,
                priceCalculationId: 1,
                quantity: 10,
                totalValue: 200,
                date: new Date("2024-01-01"),
            });
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockSale);
        });

        it("should throw a ValidationError if required fields are missing", async () => {
            mockRequest.body = {
                priceCalculationId: 1,
                quantity: 10,
            }; // Missing date

            await expect(priceController.registerSale(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it("should throw a NotFoundError if price calculation is not found", async () => {
            mockRequest.body = {
                priceCalculationId: 1,
                quantity: 10,
                date: "2024-01-01",
            };

            PriceCalculationService.prototype.findById.mockResolvedValue(null);

            await expect(priceController.registerSale(mockRequest, mockResponse, nextFunction)).rejects.toThrow(NotFoundError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });
});
