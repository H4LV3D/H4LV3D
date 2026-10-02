"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePageTransition } from "@/components/motion/page-transition";
import { useThemeSwitch } from "./theme-toggle";
import { useSwitchLocale } from "./locale-switcher";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { allPages } from "./nav-items";
import { site } from "@/config/site";
import { localeNames, routing } from "@/i18n/routing";
import { ArrowRight, ArrowUpRight, Copy, Globe, Monitor, Moon, Sun } from "@/components/illustrations/doodle-icons";

const CommandMenuContext = React.createContext<{ open: () => void }>({ open: () => {} });
export const useCommandMenu = () => React.useContext(CommandMenuContext);

/** ⌘K / Ctrl+K palette: pages, theme, language, socials, copy email. */
export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("Command");
  const nav = useTranslations("Nav");
  const locale = useLocale();
  const { navigate } = usePageTransition();
  const switchTheme = useThemeSwitch();
  const switchLocale = useSwitchLocale();
  const copyEmail = useCopyEmail();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Let the dialog close before navigating / re-theming.
    setTimeout(fn, 120);
  };

  const ctx = React.useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <CommandMenuContext.Provider value={ctx}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen} title={nav("openCommand")} description={t("placeholder")}>
        <CommandInput placeholder={t("placeholder")} />
        <CommandList>
          <CommandEmpty>{t("empty")}</CommandEmpty>
          <CommandGroup heading={t("pages")}>
            {allPages.map((p) => (
              <CommandItem key={p.href} value={nav(p.key)} onSelect={() => run(() => navigate(p.href))}>
                <ArrowRight />
                {nav(p.key)}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("actions")}>
            <CommandItem value={t("copyEmail")} onSelect={() => run(copyEmail)}>
              <Copy />
              {t("copyEmail")}
              <CommandShortcut>{site.email}</CommandShortcut>
            </CommandItem>
            <CommandItem
              value={`${nav("theme.label")} ${nav("theme.light")}`}
              onSelect={() => run(() => switchTheme("light"))}
            >
              <Sun />
              {nav("theme.light")}
            </CommandItem>
            <CommandItem
              value={`${nav("theme.label")} ${nav("theme.dark")}`}
              onSelect={() => run(() => switchTheme("dark"))}
            >
              <Moon />
              {nav("theme.dark")}
            </CommandItem>
            <CommandItem
              value={`${nav("theme.label")} ${nav("theme.system")}`}
              onSelect={() => run(() => switchTheme("system"))}
            >
              <Monitor />
              {nav("theme.system")}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("language")}>
            {routing.locales.map((l) => (
              <CommandItem
                key={l}
                value={`${t("language")} ${localeNames[l]} ${l}`}
                onSelect={() => run(() => switchLocale(l))}
                disabled={l === locale}
              >
                <Globe />
                <span lang={l}>{localeNames[l]}</span>
                <CommandShortcut>{l.toUpperCase()}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("socials")}>
            {site.socials.map((s) => (
              <CommandItem
                key={s.id}
                value={s.label}
                onSelect={() => run(() => window.open(s.href, "_blank", "noopener,noreferrer"))}
              >
                <ArrowUpRight />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandMenuContext.Provider>
  );
}
