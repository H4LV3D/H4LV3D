"use client";

import * as React from "react";
import { m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Close, Menu } from "@/components/illustrations/doodle-icons";
import { OpenPeep } from "@/components/illustrations/open-peeps/open-peep";
import { peep as explaining } from "@/components/illustrations/open-peeps/generated/explaining";
import { usePageTransition } from "@/components/motion/page-transition";
import { getPathname, usePathname } from "@/i18n/navigation";
import { allPages } from "./nav-items";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const t = useTranslations("Nav");
  const peepT = useTranslations("Peep");
  const [open, setOpen] = React.useState(false);
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={t("menu")}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="overflow-hidden">
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
        <SheetDescription className="sr-only">{t("primary")}</SheetDescription>
        <div className="container-page flex h-16 items-center justify-between">
          <span className="label-mono text-muted-foreground">{t("menu")}</span>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label={t("close")}>
              <Close className="size-5" />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label={t("primary")} className="container-page mt-6 flex flex-col">
          {allPages.map((p, i) => {
            const active = p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
            return (
              <div key={p.href} className="overflow-hidden border-b border-border/70 pt-1 pb-2">
                <m.a
                  href={getPathname({ href: p.href, locale })}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    if (!active) setTimeout(() => navigate(p.href), 250);
                  }}
                  className={cn("flex items-baseline gap-4 py-4 font-display text-5xl", active && "text-brand")}
                  initial={{ y: "100%" }}
                  animate={{ y: open ? "0%" : "100%" }}
                  transition={{ duration: 0.7, ease: ease.out, delay: open ? 0.25 + i * 0.06 : 0 }}
                >
                  <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  {t(p.key)}
                </m.a>
              </div>
            );
          })}
        </nav>
        <div className="container-page mt-auto flex items-end justify-between pb-6">
          <ul className="flex flex-col gap-1">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono text-muted-foreground hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {open && <OpenPeep peep={explaining} title={peepT("explaining")} className="-mb-6 w-40" />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
