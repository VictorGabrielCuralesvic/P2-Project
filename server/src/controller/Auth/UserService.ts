import prisma from "../../utils/prisma";
import { AuthService } from "./AuthService";

export class UserService {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async createUser(name: string, email: string, password: string) {
        const userExists = await prisma.user.findUnique({ where: { email }});

        if (userExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await this.authService.hashPassword(password);

        return await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
    }

    async updateUser(id: number, data: { name?: string; email?: string }) {
        const userExists = await prisma.user.findUnique({ where: { id } });
    
        if (!userExists) {
            throw new Error("User not found");
        }
    
        if (data.email && data.email !== userExists.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new Error("O email já está em uso.");
            }
        }
    
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
    

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }
}