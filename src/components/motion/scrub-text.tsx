"use client";

import * as React from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";

const CJK = /[　-鿿豈-﫿]/;

/**
 * Paragraph whose words shift from muted gray to full foreground as you
 * scroll through it.
 */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const pieces = CJK.test(text) ? Array.from(text) : text.split(" ");
  const joiner = CJK.test(text) ? "" : " ";

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {pieces.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / pieces.length, (i + 1) / pieces.length]}>
          {w + (i < pieces.length - 1 ? joiner : "")}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <m.span aria-hidden style={{ opacity }}>
      {children}
    </m.span>
  );
}
