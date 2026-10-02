"use client";

import { m } from "motion/react";
import { ease } from "@/lib/motion";

/** Per-page enter animation (used by app/[locale]/template.tsx). */
export function PageEnter({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: ease.out, delay: 0.1 }}
    >
      {children}
    </m.div>
  );
}
