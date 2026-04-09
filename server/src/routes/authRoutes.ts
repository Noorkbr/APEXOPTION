import { Router } from "express";
import { authController } from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { authRateLimiter, apiRateLimiter } from "../middleware/rateLimiter";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validators/authSchemas";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), authController.register);
router.post("/login", authRateLimiter, validate(loginSchema), authController.login);
router.post("/refresh", apiRateLimiter, validate(refreshTokenSchema), authController.refreshToken);
router.post("/logout", apiRateLimiter, authenticate, authController.logout);
router.get("/profile", apiRateLimiter, authenticate, authController.getProfile);

export default router;
