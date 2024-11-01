import { CustomError } from "./CustomError";

export class AuthenticationError extends CustomError {
    constructor(message = "Erro de autenticação") {
        super(message, 401);
    }
}