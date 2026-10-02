"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "motion/react";
import { ease } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** Render as a list item (inside <ul>/<ol>). */
  as?: "div" | "li";
};

/** Fade + rise when scrolled into view. */
export function Reveal({ delay = 0, y = 28, immediate = false, as = "div", children, ...props }: RevealProps) {
  const target = { opacity: 1, y: 0 };
  const Comp = (as === "li" ? m.li : m.div) as typeof m.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: 0.8, ease: ease.out, delay }}
      {...props}
    >
      {children}
    </Comp>
  );
}
