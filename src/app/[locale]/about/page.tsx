import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { site } from "@/config/site";
import { PageHeader } from "@/components/sections/page-header";
import { SectionLabel } from "@/components/sections/section-label";
import { PortraitSwap } from "@/components/sections/about/portrait-swap";
import { AboutTabs } from "@/components/sections/about/about-tabs";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { Doodle } from "@/components/illustrations/doodle";
import { SketchFrame } from "@/components/illustrations/sketch-frame";
import type { DoodleName } from "@/components/illustrations/doodle-paths";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor(locale, "/about") };
}

const OFFSCREEN: { key: "games" | "series" | "books" | "oss"; doodle: DoodleName }[] = [
  { key: "games", doodle: "star" },
  { key: "series", doodle: "sparkle" },
  { key: "books", doodle: "heart" },
  { key: "oss", doodle: "burst" },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const stats = Object.entries(site.stats) as [keyof typeof site.stats, number][];

  return (
    <>
      <PageHeader label={t("label")} title={t("title")} />

      <section className="container-page grid gap-14 md:grid-cols-12">
        <Reveal immediate delay={0.3} className="md:col-span-5">
          <PortraitSwap />
        </Reveal>
        <div className="relative flex flex-col gap-6 text-xl leading-relaxed text-pretty md:col-span-6 md:col-start-7 md:text-2xl">
          <Reveal>
            <p>{t("story.p1")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-muted-foreground">{t("story.p2")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground">{t("story.p3")}</p>
          </Reveal>
          <Reveal delay={0.2} className="flex items-center gap-2 self-start md:-ml-24">
            <Doodle name="arrow-loop" className="h-14 w-20 -scale-x-100 rotate-[200deg]" tone="muted" />
            <span className="-rotate-3 font-hand text-2xl text-muted-foreground">{t("story.note")}</span>
          </Reveal>
        </div>
      </section>

      <section className="container-page mt-32">
        <SectionLabel className="mb-10">{t("stats.label")}</SectionLabel>
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([key, value]) => (
            <Reveal key={key} className="flex flex-col-reverse gap-2 border-t border-border pt-6">
              <dt className="label-mono text-muted-foreground">{t(`stats.${key}`)}</dt>
              <dd className="font-display text-7xl md:text-8xl">
                <CountUp value={value} suffix="+" />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="container-page mt-32">
        <AboutTabs />
      </section>

      <section className="container-page mt-32">
        <SectionLabel className="mb-10">{t("offscreen.label")}</SectionLabel>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {OFFSCREEN.map(({ key, doodle }, i) => (
            <Reveal
              as="li"
              key={key}
              delay={i * 0.06}
              className="group relative flex aspect-square flex-col items-start justify-between rounded-md border border-border bg-card p-6 transition-colors hover:border-transparent"
            >
              <SketchFrame />
              <Doodle name={doodle} className="size-12" delay={0.2 + i * 0.1} />
              <span className="font-display text-3xl">{t(`offscreen.${key}`)}</span>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
