"use client";

import * as React from "react";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/navigation";
import { TransitionLink } from "@/components/motion/page-transition";
import { Signature } from "@/components/illustrations/signature";
import { Button } from "@/components/ui/button";
import { useIntro } from "@/components/providers/intro-provider";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { useCommandMenu } from "./command-menu";
import { navItems } from "./nav-items";
import { ease } from "@/lib/motion";

const noopSubscribe = () => () => {};

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { introDone } = useIntro();
  const { open } = useCommandMenu();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoKey, setLogoKey] = React.useState(0);
  const isMac = React.useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true,
  );

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 160 && y > prev);
  });

  return (
    <m.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled ? "border-border/70 bg-background/75 backdrop-blur-md" : "border-transparent",
      )}
      initial={{ y: "-100%" }}
      animate={{ y: introDone && !hidden ? "0%" : "-100%" }}
      transition={{ duration: 0.6, ease: ease.out, delay: introDone && !hidden && !scrolled ? 0.6 : 0 }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-foreground"
      >
        {t("skip")}
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <TransitionLink
          href="/"
          aria-label={t("home")}
          className="-ml-1 p-1 text-foreground"
          onPointerEnter={() => setLogoKey((k) => k + 1)}
        >
          <Signature
            variant="short"
            className="h-9 w-auto md:h-10"
            play={introDone}
            drawKey={logoKey}
            duration={0.9}
            strokeWidth={30}
          />
        </TransitionLink>

        <nav aria-label={t("primary")} className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t(item.key)}
                {active && (
                  <m.svg
                    layoutId="nav-underline"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-2.5 w-full text-brand"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <path
                      d="M2 8 C 40 3, 90 3, 130 6 S 185 10, 198 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </m.svg>
                )}
              </TransitionLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={open}
            aria-label={t("openCommand")}
            className="hidden gap-1 font-mono text-muted-foreground lg:inline-flex"
          >
            <kbd className="rounded-sm border px-1.5 py-0.5 text-[0.7rem]">{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd className="rounded-sm border px-1.5 py-0.5 text-[0.7rem]">K</kbd>
          </Button>
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </m.header>
  );
}
