import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { UserService } from "./UserService";

export class AuthController {
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const user = await this.userService.createUser(name, email, password);
            const token = this.authService.generateToken(user.id.toString());

            return res.status(201).json({ user, token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: "Unknown error" });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const user = await this.userService.findUserByEmail(email);

            if (!user || !(await this.authService.comparePassword(password, user.password))) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = this.authService.generateToken(user.id.toString());
            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async validateToken(req: Request, res: Response) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        try {
            const decoded = this.authService.validateToken(token);
            return res.status(200).json({ valid: true, decoded });
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }
    }
}