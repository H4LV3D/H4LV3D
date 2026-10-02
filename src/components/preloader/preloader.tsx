"use client";

import * as React from "react";
import { animate, m, useMotionValue, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

import { useIntro } from "@/components/providers/intro-provider";
import { Signature } from "@/components/illustrations/signature";
import { ease } from "@/lib/motion";

const FLAT = "M0 0 L1440 0 L1440 1 Q720 1 0 1 Z";
const CURVED = "M0 0 L1440 0 L1440 1 Q720 180 0 1 Z";

/**
 * Full-page loading screen. It is server-rendered (so it covers the page
 * before any JS runs) and only plays on a full page load / refresh — client
 * navigations never remount the root layout.
 *
 * Progress follows real readiness (fonts + window load), with a minimum
 * display time so the signature can finish drawing, and a hard cap.
 */
export function Preloader() {
  const t = useTranslations("Preloader");
  const { finishIntro } = useIntro();
  const [phase, setPhase] = React.useState<"loading" | "done" | "exiting" | "gone">("loading");
  // Read once on the client: reduced motion → instant, repeat visit → short.
  const [config] = React.useState(() => {
    if (typeof window === "undefined") return { min: 1.8, reduce: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {}
    return { min: reduce ? 0.2 : seen ? 0.8 : 1.8, reduce };
  });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  React.useEffect(() => {
    const { min, reduce } = config;
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}

    const main = document.getElementById("main");
    if (main) main.inert = true;

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const ready = Promise.race([Promise.all([loaded, document.fonts?.ready]), new Promise((r) => setTimeout(r, 4000))]);

    let cancelled = false;
    const first = animate(count, 90, { duration: min, ease: "easeOut" });
    Promise.all([first.finished, ready]).then(() => {
      if (cancelled) return;
      animate(count, 100, { duration: 0.35, ease: "easeOut" }).finished.then(() => {
        if (cancelled) return;
        // Let the brand dot pop before the panel lifts.
        setPhase("done");
        setTimeout(() => !cancelled && setPhase("exiting"), reduce ? 0 : 380);
      });
    });
    return () => {
      cancelled = true;
      first.stop();
    };
  }, [count, config]);

  const finish = () => {
    setPhase("gone");
    document.documentElement.classList.remove("preloading");
    const main = document.getElementById("main");
    if (main) main.inert = false;
    finishIntro();
  };

  if (phase === "gone") return null;

  return (
    <m.div
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
      className="preloader fixed inset-0 z-[95] text-foreground"
      initial={false}
      animate={phase === "exiting" ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.9, ease: ease.inOut }}
      onAnimationComplete={() => phase === "exiting" && finish()}
    >
      <div className="absolute inset-0 bg-background" />
      {/* Curved bottom edge that flattens as the panel lifts. */}
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute top-full left-0 h-[18vh] w-full fill-background"
      >
        <m.path
          initial={false}
          d={FLAT}
          animate={{ d: phase === "exiting" ? [FLAT, CURVED, FLAT] : FLAT }}
          transition={{ duration: 0.9, ease: ease.inOut }}
        />
      </svg>

      <div className="container-page relative flex h-full flex-col justify-between py-8">
        <div className="label-mono flex justify-between text-muted-foreground">
          <span>Toluwalope Akinkunmi</span>
          <span>{t("loading")}…</span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Signature className="w-[min(82vw,640px)]" duration={config.min * 0.85} strokeWidth={24} />
        </div>

        <div className="flex items-end justify-between">
          <p className="font-hand text-2xl text-muted-foreground md:text-3xl">{t("tagline")}</p>
          <div className="flex items-start gap-2">
            <m.span className="font-mono text-6xl tracking-tighter tabular-nums md:text-8xl">{display}</m.span>
            <m.span
              className="mt-2 size-3 rounded-full bg-brand md:size-4"
              initial={{ scale: 0 }}
              animate={phase === "loading" ? { scale: 0 } : { scale: [0, 1.6, 1] }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </m.div>
  );
}
