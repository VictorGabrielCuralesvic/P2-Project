import { TransactionController } from "../controller/Transaction/TransactionController";
import { TransactionService } from "../controller/Transaction/TransactionService";
import { ValidationError } from "../error/ValidationError";
import { NotFoundError } from "../error/NotFoundError";

jest.mock("../controller/Transaction/TransactionService");

describe("TransactionController", () => {
    let transactionController;
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();

    beforeEach(() => {
        transactionController = new TransactionController();
        mockRequest = {
            user: { userId: 1 },
            body: {},
            query: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe("create", () => {
        it("should create a transaction and return it", async () => {
            mockRequest.body = {
                type: "INCOME",
                amount: 100,
                date: "2024-01-01",
            };

            const mockTransaction = { id: 1, ...mockRequest.body };
            TransactionService.prototype.createTransaction.mockResolvedValue(mockTransaction);

            await transactionController.create(mockRequest, mockResponse, nextFunction);

            expect(TransactionService.prototype.createTransaction).toHaveBeenCalledWith(
                1,
                "INCOME",
                100, 
                new Date("2024-01-01")
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTransaction);
        });

        it("should throw a ValidationError if required fields are missing", async () => {
            mockRequest.body = {
                type: "INCOME",
                amount: 100,
            };

            await expect(transactionController.create(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("list", () => {
        it("should list transactions for the user", async () => {
            mockRequest.query = {
                startDate: "2024-01-01",
                endDate: "2024-12-31",
            };

            const mockTransactions = [{ id: 1, type: "INCOME", amount: 100 }];
            TransactionService.prototype.listTransactions.mockResolvedValue(mockTransactions);

            await transactionController.list(mockRequest, mockResponse, nextFunction);

            expect(TransactionService.prototype.listTransactions).toHaveBeenCalledWith(
                1, 
                "2024-01-01", 
                "2024-12-31"
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTransactions);
        });

        it("should throw a NotFoundError if no transactions are found", async () => {
            mockRequest.query = {
                startDate: "2024-01-01",
                endDate: "2024-12-31",
            };

            TransactionService.prototype.listTransactions.mockResolvedValue([]);

            await expect(transactionController.list(mockRequest, mockResponse, nextFunction)).rejects.toThrow(NotFoundError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("getBalance", () => {
        it("should return the balance for the user", async () => {
            mockRequest.query = {
                startDate: "2024-01-01",
                endDate: "2024-12-31",
            };

            const mockBalance = { totalIncome: 200, totalExpense: 100, balance: 100 };
            TransactionService.prototype.calculateBalance.mockResolvedValue(mockBalance);

            await transactionController.getBalance(mockRequest, mockResponse, nextFunction);

            expect(TransactionService.prototype.calculateBalance).toHaveBeenCalledWith(
                1, 
                "2024-01-01",
                "2024-12-31"
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockBalance);
        });

        it("should throw a NotFoundError if balance cannot be calculated", async () => {
            mockRequest.query = {
                startDate: "2024-01-01",
                endDate: "2024-12-31",
            };

            TransactionService.prototype.calculateBalance.mockResolvedValue(null);

            await expect(transactionController.getBalance(mockRequest, mockResponse, nextFunction)).rejects.toThrow(NotFoundError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("getTotalRevenueByDate", () => {
        it("should return total revenue for a specific date", async () => {
            mockRequest.query = {
                date: "2024-01-01",
            };

            const mockTotalRevenue = 150;
            TransactionService.prototype.getTotalRevenueByDate.mockResolvedValue(mockTotalRevenue);

            await transactionController.getTotalRevenueByDate(mockRequest, mockResponse, nextFunction);

            expect(TransactionService.prototype.getTotalRevenueByDate).toHaveBeenCalledWith(
                1,
                "2024-01-01"
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ totalRevenue: mockTotalRevenue });
        });

        it("should throw a ValidationError if date is missing", async () => {
            await expect(transactionController.getTotalRevenueByDate(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it("should throw a NotFoundError if no revenue is found for the date", async () => {
            mockRequest.query = {
                date: "2024-01-01",
            };

            TransactionService.prototype.getTotalRevenueByDate.mockResolvedValue(null);

            await expect(transactionController.getTotalRevenueByDate(mockRequest, mockResponse, nextFunction)).rejects.toThrow(NotFoundError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });
});
