"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { contactSchema, type ContactInput, type ContactResult } from "@/lib/contact-schema";
import { site } from "@/config/site";

/*
 * Environment:
 *   RESEND_API_KEY      — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    — where messages are delivered (defaults to site.email)
 *   CONTACT_FROM_EMAIL  — a sender on a domain verified in Resend,
 *                         e.g. "Portfolio <hello@toluwalope.tech>"
 */

// Best-effort, per-instance rate limit: 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fields: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      fields[key] ??= issue.message;
    }
    return { status: "invalid", fields };
  }

  const data = parsed.data;
  // Honeypot filled → pretend success, send nothing.
  if (data.company) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "rate-limited" };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return { status: "not-configured" };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: process.env.CONTACT_TO_EMAIL || site.email,
      replyTo: data.email,
      subject: `Portfolio: new message from ${data.name}`,
      text: [`Name: ${data.name}`, `Email: ${data.email}`, `Budget: ${data.budget ?? "—"}`, "", data.message].join(
        "\n",
      ),
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error" };
  }
}
