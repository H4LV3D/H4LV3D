"use client";

import * as React from "react";
import { m } from "motion/react";
import { ease, stagger as staggerToken } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  /** Split by word (default) or by character. CJK text is always split by character. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** Start the animation (defaults to on view). */
  play?: boolean;
  className?: string;
  wordClassName?: string;
};

const CJK = /[　-鿿豈-﫿]/;

/**
 * Masked text reveal: each word slides up from behind a clipping mask.
 * Screen readers get the plain sentence via the aria-label.
 */
export function SplitText({
  text,
  by = "word",
  delay = 0,
  stagger = staggerToken,
  play,
  className,
  wordClassName,
}: SplitTextProps) {
  const pieces = by === "char" || CJK.test(text) ? Array.from(text) : text.split(/(\s+)/);
  const controlled = play !== undefined;

  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      {pieces.map((piece, i) =>
        /^\s+$/.test(piece) ? (
          <span key={i} aria-hidden>
            {" "}
          </span>
        ) : (
          <span key={i} aria-hidden className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <m.span
              className={cn("inline-block will-change-transform", wordClassName)}
              initial={{ y: "110%", rotate: 4 }}
              {...(controlled
                ? { animate: play ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 } }
                : { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true } })}
              transition={{ duration: 0.9, ease: ease.out, delay: delay + i * stagger * 0.5 }}
            >
              {piece}
            </m.span>
          </span>
        ),
      )}
    </span>
  );
}
