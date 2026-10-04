import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";
import { routing, localeTags } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { brand, brandCssVariables } from "@/config/brand";
import { site } from "@/config/site";
import { alternatesFor } from "@/lib/metadata";
import { Providers } from "@/components/providers/providers";
import { CommandMenuProvider } from "@/components/layout/command-menu";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/preloader/preloader";
import { Cursor } from "@/components/motion/cursor";
import { Grain } from "@/components/illustrations/grain";
import { BoilFilter } from "@/components/illustrations/boil-filter";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: brand.accent,
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("siteTitle"), template: `%s — ${site.name}` },
    description: t("description"),
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeTags[locale],
      title: t("siteTitle"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image", creator: "@kinkunmz_" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${fontVariables} preloading`}
      style={brandCssVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}html.preloading{overflow:auto!important}`}</style>
        </noscript>
        <NextIntlClientProvider>
          <Providers>
            <CommandMenuProvider>
              <Preloader />
              <Header />
              <main id="main" className="relative">
                {children}
              </main>
              <Footer />
              <Cursor />
            </CommandMenuProvider>
          </Providers>
        </NextIntlClientProvider>
        <BoilFilter />
        <Grain />
        <Analytics />
      </body>
    </html>
  );
}
