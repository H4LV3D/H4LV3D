"use client";

import * as React from "react";
import { m, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { doodles, type DoodleDef, type DoodleName } from "./doodle-paths";

type DoodleProps = {
  name: DoodleName;
  /** When to draw: on mount, when scrolled into view, or controlled. */
  draw?: "mount" | "inView" | boolean;
  delay?: number;
  duration?: number;
  /** "brand" (default), "current" (inherit text colour) or "muted". */
  tone?: "brand" | "current" | "muted";
  strokeWidth?: number;
  className?: string;
};

/**
 * A hand-drawn doodle that draws itself. Decorative only (aria-hidden).
 *
 * Stretched doodles (underlines, circles…) keep a constant on-screen stroke
 * via `vector-effect: non-scaling-stroke`. Chrome mis-sizes `pathLength`
 * dashes in that mode, so for those we measure the on-screen length and
 * animate the dash offset in pixels instead.
 */
export function Doodle({
  name,
  draw = "inView",
  delay = 0,
  duration = 0.9,
  tone = "brand",
  strokeWidth,
  className,
}: DoodleProps) {
  const def: DoodleDef = doodles[name];
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [lengths, setLengths] = React.useState<number[] | null>(null);

  const isHighlight = name === "highlight";
  const scalingFree = Boolean(def.stretch) && !isHighlight;

  React.useLayoutEffect(() => {
    if (!scalingFree || !ref.current) return;
    const svg = ref.current;
    const measure = () => {
      const [, , vw, vh] = def.viewBox.split(" ").map(Number);
      const box = svg.getBoundingClientRect();
      const scale = Math.max(box.width / vw, box.height / vh);
      const paths = Array.from(svg.querySelectorAll("path"));
      setLengths(paths.map((p) => Math.ceil(p.getTotalLength() * scale) + 4));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [scalingFree, def.viewBox]);

  const shown = reduce || draw === true || draw === "mount" || (draw === "inView" && inView);
  const per = duration / def.strokes.length;

  return (
    <svg
      ref={ref}
      viewBox={def.viewBox}
      preserveAspectRatio={def.stretch ? "none" : "xMidYMid meet"}
      aria-hidden
      className={cn(
        "pointer-events-none overflow-visible",
        tone === "brand" && "text-brand",
        tone === "muted" && "text-muted-foreground",
        className,
      )}
    >
      {def.strokes.map((d, i) => {
        const timing = {
          delay: delay + i * per,
          duration: per * 1.1,
          ease: ease.out,
        };
        const common = {
          d,
          fill: def.fill ? "currentColor" : "none",
          stroke: "currentColor",
          strokeWidth: strokeWidth ?? def.width ?? 3,
          strokeLinecap: (isHighlight ? "butt" : "round") as "butt" | "round",
          strokeLinejoin: "round" as const,
          strokeOpacity: isHighlight ? 0.35 : 1,
        };

        if (scalingFree) {
          const len = lengths?.[i] ?? 0;
          return (
            <m.path
              key={i}
              {...common}
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: len || undefined }}
              initial={false}
              animate={{
                strokeDashoffset: shown || reduce ? 0 : len,
                opacity: lengths && (shown || reduce) ? 1 : 0,
              }}
              transition={{
                strokeDashoffset: reduce ? { duration: 0 } : timing,
                opacity: { delay: reduce ? 0 : timing.delay, duration: 0.01 },
              }}
            />
          );
        }

        return (
          <m.path
            key={i}
            {...common}
            fillOpacity={0}
            initial={reduce ? false : { pathLength: 0, fillOpacity: 0, opacity: 0 }}
            animate={
              shown
                ? { pathLength: 1, fillOpacity: def.fill ? 1 : 0, opacity: 1 }
                : { pathLength: 0, fillOpacity: 0, opacity: 0 }
            }
            transition={{
              pathLength: timing,
              // Hide the round-cap dot a zero-length dash would leave.
              opacity: { delay: timing.delay, duration: 0.01 },
              fillOpacity: { delay: delay + duration, duration: 0.3 },
            }}
          />
        );
      })}
    </svg>
  );
}
