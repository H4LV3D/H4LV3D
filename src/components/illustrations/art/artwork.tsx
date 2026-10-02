"use client";

import * as React from "react";
import { m, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { laptop } from "./laptop";

const art = { laptop } as const;
export type ArtName = keyof typeof art;

type ArtworkProps = {
  name: ArtName;
  /** Accessible description of the drawing. */
  title: string;
  /** Hold the draw-in until true (e.g. until the preloader finishes). */
  play?: boolean;
  /** Hand-drawn line wobble. */
  boil?: boolean;
  className?: string;
};

/**
 * One of Toluwalope's hand-drawn illustrations (vectorised with
 * scripts/vectorize-illustration.mjs). The ink traces itself in, then fills;
 * a paper cut-out behind it keeps the drawing readable in dark mode.
 */
export function Artwork({ name, title, play = true, boil = true, className }: ArtworkProps) {
  const { viewBox, ink, silhouette } = art[name];
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = reduce || (inView && play);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className={cn("artwork h-auto w-full overflow-visible select-none", boil && "boil", className)}
    >
      <m.g
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <m.path
          d={silhouette}
          fill="var(--art-paper)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <m.path
          d={ink}
          fillRule="evenodd"
          stroke="var(--art-ink)"
          strokeWidth={2}
          initial={reduce ? false : { pathLength: 0, fill: "rgba(0,0,0,0)" }}
          animate={show ? { pathLength: 1, fill: "var(--art-ink)" } : { pathLength: 0, fill: "rgba(0,0,0,0)" }}
          transition={{
            pathLength: { duration: 1.8, ease: [0.65, 0, 0.35, 1] },
            fill: { duration: 0.6, delay: 1.3 },
          }}
        />
      </m.g>
    </svg>
  );
}
