"use server";

import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import { contactSchema, type ContactInput, type ContactResult } from "@/lib/contact-schema";
import { ownerEmail, senderEmail } from "@/lib/contact-email";
import { localeTags, routing } from "@/i18n/routing";
import { site } from "@/config/site";

/*
 * Environment:
 *   RESEND_API_KEY      — from https://resend.com/api-keys (required)
 *   CONTACT_FROM_EMAIL  — a sender on a domain verified in Resend,
 *                         e.g. "Toluwalope Akinkunmi <hello@toluwalopeakinkunmi.dev>".
 *                         Optional: without it, messages are still delivered
 *                         to you via Resend's test sender, but people who
 *                         write in don't get a confirmation email (Resend only
 *                         lets the test sender mail the account owner).
 *   CONTACT_TO_EMAIL    — where messages are delivered (defaults to site.email)
 */
const TEST_SENDER = `${site.name} <onboarding@resend.dev>`;

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

export async function sendContactMessage(input: ContactInput, requestedLocale?: string): Promise<ContactResult> {
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
  if (data.trap) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "rate-limited" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: "not-configured" };

  const verifiedFrom = process.env.CONTACT_FROM_EMAIL?.trim();
  const from = verifiedFrom || TEST_SENDER;
  const owner = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const locale = hasLocale(routing.locales, requestedLocale) ? requestedLocale : routing.defaultLocale;

  try {
    const resend = new Resend(apiKey);
    const budgets = await getTranslations({ locale: "en", namespace: "Contact.form.budgets" });

    // 1. The message itself, to you. Replying answers the sender.
    const notification = ownerEmail({
      data,
      budget: data.budget ? budgets(data.budget) : "—",
      locale,
      siteUrl: site.url,
    });
    const { error } = await resend.emails.send({ from, to: owner, replyTo: data.email, ...notification });
    if (error) {
      console.error("[contact] Resend error (notification)", error);
      if (!verifiedFrom) {
        console.error(
          `[contact] Sending from Resend's test address, which only delivers to the email the Resend account was created with. ` +
            `Set CONTACT_TO_EMAIL to that address, or verify a domain in Resend and set CONTACT_FROM_EMAIL.`,
        );
      }
      return { status: "error" };
    }

    // 2. A confirmation to the sender, in their language. Needs a verified
    //    sending domain; a failure here never fails the form.
    if (verifiedFrom) {
      const t = await getTranslations({ locale, namespace: "Contact.autoReply" });
      const confirmation = senderEmail(
        data,
        {
          subject: t("subject"),
          greeting: t("greeting", { name: data.name }),
          body: t("body"),
          quoteLabel: t("quoteLabel"),
          signoff: t("signoff"),
        },
        localeTags[locale],
        site.name,
        site.url,
      );
      const reply = await resend.emails.send({ from, to: data.email, replyTo: owner, ...confirmation });
      if (reply.error) console.error("[contact] Resend error (confirmation)", reply.error);
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error" };
  }
}
