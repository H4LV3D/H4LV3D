"use client";

import * as React from "react";
import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { signature, signatureShort } from "./signature-paths";

type SignatureProps = {
  variant?: "full" | "short";
  /** Draw state. Change `drawKey` to replay. */
  play?: boolean;
  drawKey?: number;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

/** Toluwalope's handwritten signature, drawn stroke by stroke. */
export function Signature({
  variant = "full",
  play = true,
  drawKey = 0,
  duration = 1.6,
  delay = 0,
  strokeWidth = 22,
  className,
  title,
}: SignatureProps) {
  const data = variant === "full" ? signature : signatureShort;
  const reduce = useReducedMotion();
  // Distribute time across strokes roughly by their length.
  const weights = data.paths.map((d) => d.length);
  const total = weights.reduce((a, b) => a + b, 0);
  const timings: { start: number; dur: number }[] = [];
  for (let i = 0, acc = 0; i < weights.length; acc += weights[i], i++) {
    timings.push({ start: (acc / total) * duration, dur: Math.max((weights[i] / total) * duration, 0.08) });
  }

  return (
    <svg
      viewBox={data.viewBox}
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {data.paths.map((d, i) => (
          <m.path
            key={`${drawKey}-${i}`}
            d={d}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { delay: delay + timings[i].start, duration: timings[i].dur, ease: "easeInOut" },
              opacity: { delay: delay + timings[i].start, duration: 0.01 },
            }}
          />
        ))}
      </g>
    </svg>
  );
}
