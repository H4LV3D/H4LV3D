import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { SelectedWork } from "@/components/sections/home/selected-work";
import { Toolkit } from "@/components/sections/home/toolkit";
import { Currently } from "@/components/sections/home/currently";
import { HomeCta } from "@/components/sections/home/cta";
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Developer",
  sameAs: site.socials.map((s) => s.href),
};

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Intro />
      <SelectedWork />
      <Toolkit />
      <Currently />
      <HomeCta />
    </>
  );
}
