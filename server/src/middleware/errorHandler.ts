import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error/CustomError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                statusCode: err.statusCode,
                timestamp: new Date().toISOString(),
            },
        });
    }

    console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.message}`);
    if (err.stack) {
        console.error(err.stack);
    }

    res.status(500).json({
        error: {
            message: "Erro interno do servidor",
            statusCode: 500,
            timestamp: new Date().toISOString(),
        },
    });
}