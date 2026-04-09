import { z } from "zod";

const validExpirations = [60, 300, 900, 3600] as const;

export const createTradeSchema = z.object({
  asset: z.string().min(1, "Asset is required"),
  direction: z.enum(["CALL", "PUT"], { message: "Direction must be CALL or PUT" }),
  amount: z
    .number()
    .min(1, "Minimum trade amount is $1")
    .max(10000, "Maximum trade amount is $10,000"),
  expirationSeconds: z
    .number()
    .refine((val) => validExpirations.includes(val as typeof validExpirations[number]), {
      message: "Expiration must be 60, 300, 900, or 3600 seconds",
    }),
});

export type CreateTradeInput = z.infer<typeof createTradeSchema>;
