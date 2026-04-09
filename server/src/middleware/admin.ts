import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
import { ForbiddenError } from "../utils/errors";

export function adminGuard(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== "ADMIN") {
    next(new ForbiddenError("Admin access required"));
    return;
  }
  next();
}
