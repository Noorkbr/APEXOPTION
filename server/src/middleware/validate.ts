import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";
import { BadRequestError } from "../utils/errors";

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        throw new BadRequestError(`Validation failed: ${errors}`);
      }
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}
