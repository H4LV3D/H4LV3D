"use client";

import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";

import { TransitionLink } from "@/components/motion/page-transition";
import { caseIndex, type CaseStudy } from "@/content/projects";
import { ProjectCover } from "./project-cover";
import { SketchFrame } from "@/components/illustrations/sketch-frame";
import { ease } from "@/lib/motion";

export function ProjectGrid({ projects }: { projects: CaseStudy[] }) {
  const t = useTranslations("Projects");
  const common = useTranslations("Common");
  return (
    <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      <AnimatePresence initial={false}>
        {projects.map((p, i) => (
          <m.li
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: ease.out, delay: i * 0.05 }}
            className={i % 2 === 1 ? "md:mt-24" : undefined}
          >
            <TransitionLink
              href={`/work/${p.slug}`}
              transitionLabel={t(`${p.slug}.title`)}
              data-cursor={common("view")}
              className="group flex flex-col gap-4"
            >
              <div className="relative transition-transform duration-700 ease-out-expo group-hover:-rotate-1">
                <SketchFrame />
                <ProjectCover project={p} title={t(`${p.slug}.title`)} tagline={t(`${p.slug}.tagline`)} />
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-3xl">{t(`${p.slug}.title`)}</h2>
                <span className="label-mono text-muted-foreground">{caseIndex(p.slug)}</span>
              </div>
              <p className="text-muted-foreground">{t(`${p.slug}.summary`)}</p>
            </TransitionLink>
          </m.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
