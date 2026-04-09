import { z } from "zod";

export const depositSchema = z.object({
  amount: z
    .number()
    .min(10, "Minimum deposit is $10")
    .max(100000, "Maximum deposit is $100,000"),
  method: z.enum(["stripe", "paypal", "crypto"], {
    message: "Invalid payment method",
  }),
  currency: z.string().default("USD"),
});

export const withdrawalSchema = z.object({
  amount: z
    .number()
    .min(10, "Minimum withdrawal is $10")
    .max(50000, "Maximum withdrawal is $50,000"),
  method: z.enum(["bank_transfer", "paypal", "crypto"], {
    message: "Invalid withdrawal method",
  }),
  details: z.object({
    accountNumber: z.string().optional(),
    walletAddress: z.string().optional(),
    paypalEmail: z.string().email().optional(),
  }),
});

export type DepositInput = z.infer<typeof depositSchema>;
export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
