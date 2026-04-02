import {z} from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("amount must be positive"),
  category: z.string().min(1, "category is required"),
  type: z.enum(["income", "expense"]),
  date: z.string(),
});