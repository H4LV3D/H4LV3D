import { useTranslations } from "next-intl";

import { OpenPeep } from "@/components/illustrations/open-peeps/open-peep";
import { peep as coffee } from "@/components/illustrations/open-peeps/generated/coffee";
import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/sections/section-label";
import { TransitionLink } from "@/components/motion/page-transition";

export function Currently() {
  const t = useTranslations("Home.currently");
  const peep = useTranslations("Peep");
  const items = ["building", "learning", "writing"] as const;
  return (
    <section className="container-page grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
      <div className="flex flex-col gap-8 md:col-span-7">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">{t("title")}</h2>
        <ul className="flex flex-col">
          {items.map((key, i) => (
            <Reveal
              as="li"
              key={key}
              delay={i * 0.08}
              className="flex items-center gap-5 border-b border-border py-5 text-xl md:text-2xl"
            >
              <Doodle name="check" className="size-7 shrink-0" delay={0.2 + i * 0.15} />
              {key === "writing" ? (
                <TransitionLink href="/notes" className="scribble-underline">
                  {t(key)}
                </TransitionLink>
              ) : (
                t(key)
              )}
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="mx-auto w-full max-w-sm md:col-span-5">
        <OpenPeep peep={coffee} title={peep("coffee")} />
      </div>
    </section>
  );
}
