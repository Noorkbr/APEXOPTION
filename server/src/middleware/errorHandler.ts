import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const response: ErrorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      response.stack = err.stack;
    }
    res.status(err.statusCode).json(response);
    return;
  }

  // Prisma errors
  if (err.constructor.name === "PrismaClientKnownRequestError") {
    const prismaError = err as { code: string; meta?: { target?: string[] } };
    if (prismaError.code === "P2002") {
      response.message = `A record with this ${prismaError.meta?.target?.join(", ") || "field"} already exists`;
      res.status(409).json(response);
      return;
    }
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    response.message = "Invalid token";
    res.status(401).json(response);
    return;
  }

  if (err.name === "TokenExpiredError") {
    response.message = "Token expired";
    res.status(401).json(response);
    return;
  }

  // Default error
  console.error("Unhandled Error:", err);
  response.message = process.env.NODE_ENV === "production"
    ? "Internal Server Error"
    : err.message;

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(500).json(response);
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
}
