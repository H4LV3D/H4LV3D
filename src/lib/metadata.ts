import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { localeTags, routing, type Locale } from "@/i18n/routing";
import { site } from "@/config/site";

/** Canonical + hreflang alternates for a path, across every locale. */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[localeTags[l]] = site.url + getPathname({ href: path, locale: l });
  }
  languages["x-default"] = site.url + getPathname({ href: path, locale: routing.defaultLocale });
  return {
    canonical: site.url + getPathname({ href: path, locale }),
    languages,
  };
}
