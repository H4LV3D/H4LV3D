import type { ContactInput } from "@/lib/contact-schema";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const paragraphs = (s: string) =>
  escape(s)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");

/** Minimal, inline-styled shell that renders well in Gmail, Outlook and Apple Mail. */
function layout(body: string, lang: string) {
  return `<!doctype html><html lang="${lang}"><body style="margin:0;padding:0;background:#f5f5f5">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#171717">
<div style="height:3px;width:40px;background:#FF5B1F;margin-bottom:24px"></div>
${body}
</div></body></html>`;
}

type Notification = { data: ContactInput; budget: string; locale: string; siteUrl: string };

/** The message you receive. Reply goes straight to the sender. */
export function ownerEmail({ data, budget, locale, siteUrl }: Notification) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Budget", budget],
    ["Language", locale],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", data.message, "", `— sent from ${siteUrl}/contact`].join(
    "\n",
  );
  const html = layout(
    `<h1 style="font-size:20px;margin:0 0 20px">New message from ${escape(data.name)}</h1>
<table style="border-collapse:collapse;margin:0 0 24px;font-size:14px">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#737373">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`,
      )
      .join("")}</table>
<div style="border-left:3px solid #e5e5e5;padding-left:16px">${paragraphs(data.message)}</div>
<p style="font-size:13px;color:#737373;margin-top:24px">Reply to this email to answer ${escape(data.name)} directly.</p>`,
    "en",
  );
  return { subject: `Portfolio: new message from ${data.name.replace(/\s+/g, " ")}`, text, html };
}

export type AutoReplyCopy = {
  subject: string;
  greeting: string;
  body: string;
  quoteLabel: string;
  signoff: string;
};

/** The confirmation the sender receives, in the language they used. */
export function senderEmail(data: ContactInput, copy: AutoReplyCopy, lang: string, name: string, siteUrl: string) {
  const text = [
    copy.greeting,
    "",
    copy.body,
    "",
    `${copy.quoteLabel}`,
    data.message
      .split("\n")
      .map((l) => `> ${l}`)
      .join("\n"),
    "",
    copy.signoff,
    name,
    siteUrl,
  ].join("\n");
  const html = layout(
    `<p style="margin:0 0 16px">${escape(copy.greeting)}</p>
${paragraphs(copy.body)}
<p style="margin:24px 0 8px;font-size:13px;color:#737373">${escape(copy.quoteLabel)}</p>
<div style="border-left:3px solid #e5e5e5;padding-left:16px;color:#525252">${paragraphs(data.message)}</div>
<p style="margin:24px 0 0">${escape(copy.signoff)}<br><strong>${escape(name)}</strong><br>
<a href="${siteUrl}" style="color:#171717">${escape(siteUrl.replace(/^https?:\/\//, ""))}</a></p>`,
    lang,
  );
  return { subject: copy.subject, text, html };
}
