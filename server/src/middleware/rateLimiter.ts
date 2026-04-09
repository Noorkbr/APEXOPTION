import { Request, Response, NextFunction } from "express";
import { TooManyRequestsError } from "../utils/errors";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const key of Object.keys(store)) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, 60000);

export function rateLimiter(maxRequests: number = 100, windowMs: number = 60000) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      next();
      return;
    }

    store[key].count++;

    if (store[key].count > maxRequests) {
      next(new TooManyRequestsError("Too many requests. Please try again later."));
      return;
    }

    next();
  };
}

export const authRateLimiter = rateLimiter(10, 15 * 60 * 1000); // 10 requests per 15 min
export const apiRateLimiter = rateLimiter(100, 60 * 1000); // 100 requests per minute
