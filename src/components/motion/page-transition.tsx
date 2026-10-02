"use client";

import * as React from "react";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLenis } from "@/components/providers/smooth-scroll";
import { Doodle } from "@/components/illustrations/doodle";
import { ease } from "@/lib/motion";

type Phase = "idle" | "covering" | "covered" | "revealing";

type TransitionState = {
  navigate: (href: string, label?: string) => void;
  phase: Phase;
};

const TransitionContext = React.createContext<TransitionState>({
  navigate: () => {},
  phase: "idle",
});

export function usePageTransition() {
  return React.useContext(TransitionContext);
}

const COVER = 0.55;
const REVEAL = 0.65;
const HOLD_MS = 380;

/**
 * Curtain page transitions for the App Router: cover → navigate → reveal.
 * Browser back/forward skips the curtain (history should feel instant) and
 * only runs the per-page enter animation from template.tsx.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const t = useTranslations("Nav");
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [label, setLabel] = React.useState("");
  const pending = React.useRef<string | null>(null);
  const fallback = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const labelFor = React.useCallback(
    (href: string) => {
      if (href === "/" || href === "") return t("home");
      if (href.startsWith("/about")) return t("about");
      if (href.startsWith("/work")) return t("work");
      if (href.startsWith("/contact")) return t("contact");
      return "";
    },
    [t],
  );

  const navigate = React.useCallback(
    (href: string, customLabel?: string) => {
      if (phase !== "idle") return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        router.push(href);
        return;
      }
      pending.current = href;
      setLabel(customLabel ?? labelFor(href));
      setPhase("covering");
    },
    [phase, router, labelFor],
  );

  const onCovered = () => {
    if (phase !== "covering" || !pending.current) return;
    setPhase("covered");
    router.push(pending.current, { scroll: false });
    // If the route never changes (same page, error), reveal anyway.
    fallback.current = setTimeout(() => setPhase("revealing"), 2500);
  };

  React.useEffect(() => {
    if (phase !== "covered") return;
    clearTimeout(fallback.current);
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Hold briefly so the destination label reads, and the new page paints underneath.
    const id = setTimeout(() => setPhase("revealing"), HOLD_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const value = React.useMemo(() => ({ navigate, phase }), [navigate, phase]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <m.div
            key="curtain"
            aria-hidden
            className="pointer-events-auto fixed inset-0 z-[90] flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={phase === "revealing" ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: phase === "revealing" ? REVEAL : COVER, ease: ease.inOut }}
            onAnimationComplete={() => {
              if (phase === "covering") onCovered();
              else if (phase === "revealing") {
                pending.current = null;
                setPhase("idle");
              }
            }}
          >
            {/* Hand-drawn wavy edges, so the curtain looks torn from a sketchbook. */}
            <svg
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              className="absolute -top-[59px] left-0 h-[60px] w-full fill-primary"
            >
              <path d="M0 60 L0 34 C 120 18, 240 44, 380 30 S 640 8, 780 26 S 1060 50, 1200 28 S 1380 14, 1440 30 L1440 60 Z" />
            </svg>
            <div className="absolute inset-0 bg-primary" />
            <svg
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              className="absolute -bottom-[59px] left-0 h-[60px] w-full rotate-180 fill-primary"
            >
              <path d="M0 60 L0 30 C 160 12, 300 46, 460 28 S 760 6, 900 24 S 1180 48, 1300 30 S 1410 20, 1440 26 L1440 60 Z" />
            </svg>
            <m.div
              className="relative flex items-center gap-4 text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={phase === "covered" ? { opacity: 1, y: 0 } : { opacity: 0, y: phase === "revealing" ? -20 : 20 }}
              transition={{ duration: 0.35, ease: ease.out }}
            >
              <Doodle name="sparkle" draw={phase === "covered"} className="size-8" duration={0.4} />
              <span className="font-display text-5xl italic md:text-7xl">{label}</span>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
  /** Text shown on the curtain while navigating. */
  transitionLabel?: string;
};

/** Drop-in replacement for next-intl's Link that plays the curtain transition. */
export function TransitionLink({ href, transitionLabel, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          props.target === "_blank" ||
          href.startsWith("#") ||
          href === pathname
        ) {
          return;
        }
        e.preventDefault();
        navigate(href, transitionLabel);
      }}
      {...props}
    />
  );
}
