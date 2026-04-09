import { z } from "zod";

export const createTradeSchema = z.object({
  asset: z.string().min(1, "Asset is required"),
  direction: z.enum(["CALL", "PUT"], { message: "Direction must be CALL or PUT" }),
  amount: z
    .number()
    .min(1, "Minimum trade amount is $1")
    .max(10000, "Maximum trade amount is $10,000"),
  expirationSeconds: z.enum(["60", "300", "900", "3600"], {
    message: "Invalid expiration time",
  }),
});

export type CreateTradeInput = z.infer<typeof createTradeSchema>;
