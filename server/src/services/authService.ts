import bcrypt from "bcryptjs";
import prisma from "../config/database";
import { env } from "../config/env";
import { generateTokenPair, verifyRefreshToken } from "../utils/jwt";
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} from "../utils/errors";
import { RegisterInput, LoginInput } from "../validators/authSchemas";

export class AuthService {
  async register(input: RegisterInput) {
    const { name, email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError("An account with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(env.BCRYPT_ROUNDS));

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        demoBalance: 10000,
        isDemoMode: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        avatar: true,
        balance: true,
        demoBalance: true,
        isDemoMode: true,
        createdAt: true,
      },
    });

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token as session
    await prisma.session.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user,
      ...tokens,
    };
  }

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (user.isBanned) {
      throw new UnauthorizedError("Your account has been suspended");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Your account is deactivated");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token as session
    await prisma.session.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken);

      const session = await prisma.session.findFirst({
        where: {
          token: refreshToken,
          userId: decoded.userId,
          expiresAt: { gt: new Date() },
        },
      });

      if (!session) {
        throw new UnauthorizedError("Invalid refresh token");
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.isBanned || !user.isActive) {
        throw new UnauthorizedError("Account unavailable");
      }

      // Delete old session
      await prisma.session.delete({ where: { id: session.id } });

      // Generate new token pair
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Save new refresh token
      await prisma.session.create({
        data: {
          userId: user.id,
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError("Invalid refresh token");
    }
  }

  async logout(userId: string, refreshToken: string) {
    await prisma.session.deleteMany({
      where: {
        userId,
        token: refreshToken,
      },
    });
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        avatar: true,
        balance: true,
        demoBalance: true,
        isDemoMode: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return user;
  }
}

export const authService = new AuthService();
