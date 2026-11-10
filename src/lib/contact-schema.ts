import { z } from "zod";

/**
 * Shared by the client form and the server action. Error messages are
 * message keys under Contact.form.errors.
 */
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "firstName").max(60, "firstName"),
  lastName: z.string().trim().min(1, "lastName").max(60, "lastName"),
  email: z.email("email").max(200, "email"),
  /** Optional. If given: digits, spaces, + - ( ) . — with 7 to 15 digits. */
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\+?[\d\s().-]+$/.test(v) && /^\d{7,15}$/.test(v.replace(/\D/g, ""))), "phone")
    .optional(),
  message: z.string().trim().min(10, "message").max(5000, "message"),
  /**
   * Honeypot: hidden from people, so only bots fill it in. The server quietly
   * drops anything that has it set. It is deliberately never a validation
   * error, so a browser that autofills it can't block a real message.
   */
  trap: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const fullName = (d: Pick<ContactInput, "firstName" | "lastName">) => `${d.firstName} ${d.lastName}`;

export type ContactResult =
  | { status: "success" }
  | { status: "invalid"; fields: Partial<Record<keyof ContactInput, string>> }
  | { status: "not-configured" }
  | { status: "rate-limited" }
  | { status: "error" };
