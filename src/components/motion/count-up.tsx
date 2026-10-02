"use client";

import * as React from "react";
import { animate, useInView } from "motion/react";
import { useLocale } from "next-intl";

/** Counts up to `value` when scrolled into view, formatted for the locale. */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const locale = useLocale();
  const format = React.useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
    [locale, decimals],
  );

  React.useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format.format(value) + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format.format(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, format]);

  return (
    <span ref={ref} className="tabular-nums">
      {format.format(0) + suffix}
    </span>
  );
}
