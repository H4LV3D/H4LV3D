"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "@/components/illustrations/doodle-icons";

/**
 * Switch the theme with a circular reveal that grows from (x, y), using the
 * View Transitions API where supported. Falls back to an instant switch.
 */
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return React.useCallback(
    (next: "light" | "dark" | "system", origin?: { x: number; y: number }) => {
      const target =
        next === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : next;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduce || target === resolvedTheme) {
        setTheme(next);
        return;
      }
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
        document.documentElement.classList.toggle("dark", target === "dark");
        document.documentElement.style.colorScheme = target;
      });
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [resolvedTheme, setTheme],
  );
}

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const t = useTranslations("Nav.theme");
  const { resolvedTheme } = useTheme();
  const switchTheme = useThemeSwitch();
  const mounted = React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("toggle")}
      title={t("toggle")}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        switchTheme(isDark ? "light" : "dark", { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex"
        >
          {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </m.span>
      </AnimatePresence>
    </Button>
  );
}
