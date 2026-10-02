"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { TransitionLink } from "@/components/motion/page-transition";
import { Doodle } from "@/components/illustrations/doodle";
import { ArrowUp, ArrowUpRight } from "@/components/illustrations/doodle-icons";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/providers/smooth-scroll";
import { site } from "@/config/site";
import { allPages } from "./nav-items";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const lenis = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container-page grid gap-16 py-16 md:py-24">
        <div className="flex flex-col gap-4">
          <p className="label-mono text-muted-foreground">{t("ctaSub")}</p>
          <TransitionLink
            href="/contact"
            className="group relative w-fit font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tight"
            data-cursor={nav("contact")}
          >
            <span className="relative inline-block italic">
              {t("cta")}
              <Doodle name="underline" className="absolute -bottom-2 left-0 h-[0.18em] w-full" />
            </span>
            <ArrowUpRight
              className="ml-4 inline-block size-[0.5em] align-middle transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-brand"
              strokeWidth={1.25}
            />
          </TransitionLink>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <p className="label-mono text-muted-foreground">{t("sitemap")}</p>
            {allPages.map((p) => (
              <TransitionLink key={p.href} href={p.href} className="scribble-underline w-fit">
                {nav(p.key)}
              </TransitionLink>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="label-mono text-muted-foreground">{t("elsewhere")}</p>
            {site.socials.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="scribble-underline w-fit">
                {s.label}
              </a>
            ))}
          </div>
          <div className="col-span-2 flex flex-col items-start justify-between gap-6 md:items-end">
            <a href={`mailto:${site.email}`} className="scribble-underline text-lg break-all md:text-xl">
              {site.email}
            </a>
            <Button
              variant="sketch"
              size="sm"
              onClick={() =>
                lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <ArrowUp />
              {t("backToTop")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <span>{t("rights", { year })}</span>
          <span className="font-hand text-lg">{t("built")}</span>
        </div>
      </div>
    </footer>
  );
}
