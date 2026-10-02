"use client";

import * as React from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";

import { TransitionLink } from "@/components/motion/page-transition";
import { ArrowUpRight } from "@/components/illustrations/doodle-icons";
import { Badge } from "@/components/ui/badge";
import { caseIndex, type CaseStudy } from "@/content/projects";
import { ProjectCover } from "./project-cover";
import { spring, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Editorial project list. On pointer devices a preview card follows the
 * cursor while hovering a row.
 */
export function ProjectRows({ projects, compact = false }: { projects: CaseStudy[]; compact?: boolean }) {
  const t = useTranslations("Projects");
  const common = useTranslations("Common");
  const work = useTranslations("Work");
  const [active, setActive] = React.useState<CaseStudy | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className={cn(!compact && "border-t border-border")}>
        <AnimatePresence initial={false}>
          {projects.map((p) => (
            <m.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="border-b border-border"
            >
              <TransitionLink
                href={`/work/${p.slug}`}
                transitionLabel={t(`${p.slug}.title`)}
                data-cursor={common("view")}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p)}
                className={cn(
                  "group grid items-center gap-x-4 gap-y-2",
                  compact
                    ? "grid-cols-[auto_1fr_auto] py-6 md:grid-cols-[3rem_1fr_auto] md:gap-x-6 md:py-8"
                    : "grid-cols-[auto_1fr_auto] py-7 md:grid-cols-[4rem_1.2fr_1fr_auto] md:gap-x-8 md:py-10",
                )}
              >
                <span className="label-mono text-muted-foreground">{caseIndex(p.slug)}</span>
                <span
                  className={cn(
                    "font-display leading-none transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:italic",
                    compact ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl",
                  )}
                >
                  {t(`${p.slug}.title`)}
                </span>
                <span
                  className={cn("col-start-2 text-muted-foreground", compact ? "row-start-2" : "md:col-start-auto")}
                >
                  {t(`${p.slug}.tagline`)}
                  <span className="mt-2 hidden flex-wrap gap-1.5 md:flex">
                    <Badge variant={p.status === "live" ? "brand" : "outline"}>{work(`status.${p.status}`)}</Badge>
                  </span>
                </span>
                <ArrowUpRight className="col-start-3 row-start-1 size-7 text-muted-foreground transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-brand md:col-start-auto md:row-start-auto md:size-9" />
              </TransitionLink>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Cursor-following preview */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden w-[340px] md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-110%" }}
      >
        <AnimatePresence>
          {active && (
            <m.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 3 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className={cn("shadow-2xl shadow-neutral-950/15")}
            >
              <ProjectCover
                project={active}
                title={t(`${active.slug}.title`)}
                tagline={t(`${active.slug}.tagline`)}
                size="sm"
              />
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
