import { useTranslations } from "next-intl";

import { ScrubText } from "@/components/motion/scrub-text";
import { Doodle } from "@/components/illustrations/doodle";
import { SectionLabel } from "@/components/sections/section-label";

export function Intro() {
  const t = useTranslations("Home.intro");
  return (
    <section className="container-page grid gap-10 py-24 md:grid-cols-12 md:py-40">
      <SectionLabel className="md:col-span-3">{t("label")}</SectionLabel>
      <div className="relative md:col-span-9">
        <Doodle name="sparkle" className="absolute -top-10 -left-6 size-8 md:-left-12" />
        <ScrubText
          text={t("text")}
          className="font-display text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] text-balance"
        />
      </div>
    </section>
  );
}
