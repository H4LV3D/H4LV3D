"use client";

import * as React from "react";
import { m, useScroll, useSpring } from "motion/react";
import { useTranslations } from "next-intl";

const ITEMS = ["coinsave", "cabify"] as const;

/** Experience timeline whose line draws itself as you scroll. */
export function Timeline() {
  const t = useTranslations("About.experience");
  const ref = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative flex flex-col gap-14 pl-10">
      <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
      <m.span
        aria-hidden
        className="absolute top-2 bottom-2 left-[6px] w-[3px] origin-top rounded-full bg-brand"
        style={{ scaleY }}
      />
      {ITEMS.map((key, i) => (
        <m.li
          key={key}
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <span
            aria-hidden
            className="absolute top-2 -left-10 size-4 rounded-full border-2 border-brand bg-background"
          />
          <p className="label-mono text-muted-foreground">
            {t(`${key}.company`)} {i === 0 && <>· {t("present")}</>}
          </p>
          <h3 className="mt-2 font-display text-3xl md:text-4xl">{t(`${key}.role`)}</h3>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t(`${key}.body`)}</p>
        </m.li>
      ))}
    </ol>
  );
}
