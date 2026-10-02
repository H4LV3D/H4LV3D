import { z } from "zod";

export const budgets = ["small", "medium", "large", "xl", "unsure"] as const;

/**
 * Shared by the client form and the server action. Error messages are
 * message keys under Contact.form.errors.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "name").max(120, "name"),
  email: z.email("email").max(200, "email"),
  budget: z.enum(budgets).optional(),
  message: z.string().trim().min(10, "message").max(5000, "message"),
  /** Honeypot — real people never fill this in. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { status: "success" }
  | { status: "invalid"; fields: Partial<Record<keyof ContactInput, string>> }
  | { status: "not-configured" }
  | { status: "rate-limited" }
  | { status: "error" };
