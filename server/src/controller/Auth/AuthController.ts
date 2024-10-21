import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { UserService } from "./UserService";
import { asyncHandler } from "../../middleware/asyncHandler";

export class AuthController {
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    register = asyncHandler(async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await this.userService.createUser(name, email, password);
        const token = this.authService.generateToken(user.id.toString());

        return res.status(201).json({ user, token });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await this.userService.findUserByEmail(email);

        if (!user || !(await this.authService.comparePassword(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = this.authService.generateToken(user.id.toString());
        return res.status(200).json({ user, token });
    });

    validateToken = asyncHandler(async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        const decoded = this.authService.validateToken(token);
        return res.status(200).json({ valid: true, decoded });
    });
}