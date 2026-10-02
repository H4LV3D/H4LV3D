"use client";

import * as React from "react";
import { m } from "motion/react";
import { useTranslations } from "next-intl";

import { Peep } from "@/components/illustrations/peep/peep";
import { Button } from "@/components/ui/button";
import { Copy } from "@/components/illustrations/doodle-icons";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { site } from "@/config/site";
import { ContactForm } from "./contact-form";

/** Form + the envelope-holding peep, which "sends" the letter on success. */
export function ContactBody() {
  const t = useTranslations("Contact");
  const common = useTranslations("Common");
  const copyEmail = useCopyEmail();
  const [sent, setSent] = React.useState(0);

  return (
    <div className="container-page grid gap-16 md:grid-cols-12">
      <aside className="flex flex-col gap-8 md:col-span-4">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm">
          <span className="relative flex size-2">
            {site.availableForWork && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            )}
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {site.availableForWork ? common("available") : common("unavailable")}
        </p>
        <div className="flex flex-col gap-2">
          <span className="label-mono text-muted-foreground">{t("or")}</span>
          <a href={`mailto:${site.email}`} className="scribble-underline w-fit text-lg break-all md:text-xl">
            {site.email}
          </a>
          <Button variant="sketch" size="sm" className="mt-2 w-fit" onClick={copyEmail}>
            <Copy />
            {common("copyEmail")}
          </Button>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="label-mono scribble-underline text-muted-foreground hover:text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <m.div
          key={sent}
          className="mt-4 hidden w-full max-w-xs md:block"
          initial={sent ? { y: 40, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: sent ? 0.6 : 0 }}
        >
          <Peep pose={sent ? "wave" : "envelope"} wave={sent > 0} />
        </m.div>
      </aside>
      <div className="md:col-span-7 md:col-start-6">
        <ContactForm onSent={() => setSent((n) => n + 1)} />
      </div>
    </div>
  );
}
