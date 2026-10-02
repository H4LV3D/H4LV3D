"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "@/components/illustrations/doodle-icons";

export function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  return React.useCallback(
    // Stay on the same page (and scroll position) in the new language.
    (next: Locale) => router.replace(pathname, { locale: next, scroll: false }),
    [router, pathname],
  );
}

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const switchLocale = useSwitchLocale();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 font-mono tracking-widest uppercase"
          aria-label={t("language")}
        >
          <Globe className="size-4" />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale} onValueChange={(v) => switchLocale(v as Locale)}>
          {routing.locales.map((l) => (
            <DropdownMenuRadioItem key={l} value={l} lang={l}>
              {localeNames[l]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
