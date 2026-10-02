"use client";

import * as React from "react";
import { m, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Custom cursor: a small dot plus a trailing ring. The ring grows over
 * interactive elements, and shows a label over anything with
 * `data-cursor="<label>"`. Pointer devices only; off for reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, spring.soft);
  const ry = useSpring(y, spring.soft);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setVariant("label");
        setLabel(labelled.dataset.cursor ?? "");
      } else if (target?.closest("a, button, [role='button'], input, textarea, select, label, [role='tab']")) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <m.div
        className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ x, y }}
      />
      <m.div
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ x: rx, y: ry }}
        animate={
          variant === "label"
            ? { width: 88, height: 88, backgroundColor: "var(--brand)", borderColor: "var(--brand)" }
            : variant === "hover"
              ? { width: 52, height: 52, backgroundColor: "var(--brand-soft)", borderColor: "var(--brand)" }
              : { width: 32, height: 32, backgroundColor: "rgba(0,0,0,0)", borderColor: "var(--border)" }
        }
        transition={spring.snappy}
      >
        <AnimatePresence>
          {variant === "label" && (
            <m.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[0.65rem] tracking-widest text-brand-foreground uppercase"
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
