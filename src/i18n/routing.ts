import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

/** Native names, used by the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  zh: "简体中文",
};

/** BCP 47 tags for <html lang>, Open Graph and hreflang. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  ru: "ru",
  zh: "zh-Hans",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
