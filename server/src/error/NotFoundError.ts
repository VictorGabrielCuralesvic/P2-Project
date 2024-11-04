import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor(message = "Recurso não encontrado") {
        super(message, 404);
    }
}