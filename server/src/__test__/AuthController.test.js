import { AuthController } from "../controller/Auth/AuthController";
import { AuthService } from "../controller/Auth/AuthService";
import { UserService } from "../controller/Auth/UserService";
import { ValidationError } from "../error/ValidationError";
import { AuthenticationError } from "../error/AuthenticationError";

jest.mock("../controller/Auth/AuthService");
jest.mock("../controller/Auth/UserService");

describe("AuthController", () => {
    let authController;
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();

    beforeEach(() => {
        authController = new AuthController();
        mockRequest = {
            body: {},
            headers: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe("register", () => {
        it("should register a user and return a token", async () => {
            mockRequest.body = {
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            };

            const mockUser = { id: 50, ...mockRequest.body };
            UserService.prototype.createUser.mockResolvedValue(mockUser);
            AuthService.prototype.generateToken.mockReturnValue("fake-jwt-token");

            await authController.register(mockRequest, mockResponse, nextFunction);

            expect(UserService.prototype.createUser).toHaveBeenCalledWith(
                "Test User",
                "test@example.com",
                "password123"
            );
            expect(AuthService.prototype.generateToken).toHaveBeenCalledWith("50");
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                user: mockUser,
                token: "fake-jwt-token"
            });
        });

        it("should throw a ValidationError if name, email, or password is missing", async () => {
            mockRequest.body = { email: "test@example.com" };

            await expect(authController.register(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(UserService.prototype.createUser).not.toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("login", () => {
        it("should log in a user and return a token", async () => {
            mockRequest.body = {
                email: "test@example.com",
                password: "password123"
            };

            const mockUser = { id: 50, email: "test@example.com", password: "hashedPassword" };
            UserService.prototype.findUserByEmail.mockResolvedValue(mockUser);
            AuthService.prototype.comparePassword.mockResolvedValue(true);
            AuthService.prototype.generateToken.mockReturnValue("fake-jwt-token");

            await authController.login(mockRequest, mockResponse, nextFunction);

            expect(UserService.prototype.findUserByEmail).toHaveBeenCalledWith("test@example.com");
            expect(AuthService.prototype.comparePassword).toHaveBeenCalledWith("password123", "hashedPassword");
            expect(AuthService.prototype.generateToken).toHaveBeenCalledWith("1");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                user: mockUser,
                token: "fake-jwt-token"
            });
        });

        it("should throw a ValidationError if email or password is missing", async () => {
            mockRequest.body = { email: "test@example.com" };

            await expect(authController.login(mockRequest, mockResponse, nextFunction)).rejects.toThrow(ValidationError);
            expect(UserService.prototype.findUserByEmail).not.toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it("should throw an AuthenticationError if credentials are invalid", async () => {
            mockRequest.body = {
                email: "test@example.com",
                password: "wrongPassword"
            };

            UserService.prototype.findUserByEmail.mockResolvedValue(null);

            await expect(authController.login(mockRequest, mockResponse, nextFunction)).rejects.toThrow(AuthenticationError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe("validateToken", () => {
        it("should validate a token and return decoded data", async () => {
            mockRequest.headers.authorization = "Bearer valid-token";
            const mockDecoded = { userId: "1" };
            AuthService.prototype.validateToken.mockReturnValue(mockDecoded);

            await authController.validateToken(mockRequest, mockResponse, nextFunction);

            expect(AuthService.prototype.validateToken).toHaveBeenCalledWith("valid-token");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                valid: true,
                decoded: mockDecoded
            });
        });

        it("should throw an AuthenticationError if token is missing", async () => {
            mockRequest.headers.authorization = "";

            await expect(authController.validateToken(mockRequest, mockResponse, nextFunction)).rejects.toThrow(AuthenticationError);
            expect(AuthService.prototype.validateToken).not.toHaveBeenCalled();
        });
    });
});
