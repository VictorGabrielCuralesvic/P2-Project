import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
    constructor(message = "Dados inválidos") {
        super(message, 400);
    }
}