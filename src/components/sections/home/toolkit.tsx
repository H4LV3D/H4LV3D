import { useTranslations } from "next-intl";

import { Marquee } from "@/components/motion/marquee";
import { SectionLabel } from "@/components/sections/section-label";
import { marquee } from "@/content/projects";

function Star() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className="mx-6 size-6 shrink-0 text-brand md:mx-10 md:size-8">
      <path
        d="M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Toolkit() {
  const t = useTranslations("Home.toolkit");
  const half = Math.ceil(marquee.length / 2);
  const rows = [marquee.slice(0, half), marquee.slice(half)];
  return (
    <section className="py-16 md:py-24">
      <SectionLabel className="container-page mb-10">{t("label")}</SectionLabel>
      <div className="flex flex-col gap-2 md:gap-4">
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i === 1} duration={i === 1 ? 46 : 38}>
            {row.map((item) => (
              <span key={item} className="flex items-center">
                <span className="font-display text-5xl whitespace-nowrap transition-colors hover:text-brand md:text-8xl">
                  {item}
                </span>
                <Star />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
