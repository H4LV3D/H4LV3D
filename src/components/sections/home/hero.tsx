"use client";

import * as React from "react";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";

import { useIntro } from "@/components/providers/intro-provider";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { TransitionLink } from "@/components/motion/page-transition";
import { Doodle } from "@/components/illustrations/doodle";
import Image from "next/image";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";

const ROLE_KEYS = ["a", "b", "c", "d"] as const;

export function Hero() {
  const t = useTranslations("Home.hero");
  const common = useTranslations("Common");
  const about = useTranslations("About.photo");
  const { introDone } = useIntro();
  const [role, setRole] = React.useState(0);

  React.useEffect(() => {
    if (!introDone) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLE_KEYS.length), 2800);
    return () => clearInterval(id);
  }, [introDone]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: ease.out, delay },
  });

  return (
    <section className="container-page relative grid min-h-svh grid-cols-1 items-center gap-10 pt-28 pb-16 md:grid-cols-12 md:pt-24">
      <div className="relative z-10 md:col-span-7">
        <m.p className="label-mono mb-8 flex items-center gap-3 text-muted-foreground" {...fade(0.1)}>
          <span className="relative flex size-2">
            {site.availableForWork && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            )}
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {t("eyebrow")}
        </m.p>

        <h1 className="font-display text-[clamp(3.6rem,10.5vw,10rem)] leading-[0.88] tracking-[-0.02em]">
          <SplitText text={t("greeting")} play={introDone} delay={0.15} />
          <br />
          <span className="relative inline-block italic">
            <SplitText text={t("name")} play={introDone} delay={0.3} by="char" stagger={0.05} />
            <Doodle
              name="circle"
              draw={introDone}
              delay={1.05}
              duration={1}
              className="absolute -inset-x-[6%] -inset-y-[14%] h-[128%] w-[112%]"
            />
          </span>
        </h1>

        <div className="mt-8 min-h-9 overflow-hidden py-1 text-xl md:text-2xl" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={role}
              initial={{ y: "100%", opacity: 0 }}
              animate={introDone ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: ease.out, delay: role === 0 ? 0.9 : 0 }}
              className="font-medium"
            >
              {t(`roles.${ROLE_KEYS[role]}`)}
            </m.p>
          </AnimatePresence>
        </div>

        <m.p className="mt-4 max-w-xl text-lg text-pretty text-muted-foreground md:text-xl" {...fade(1)}>
          {t("intro")}
        </m.p>

        <m.div className="mt-10 flex flex-wrap items-center gap-6" {...fade(1.15)}>
          <Magnetic>
            <Button asChild size="lg">
              <TransitionLink href="/work">
                {t("cta")}
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </TransitionLink>
            </Button>
          </Magnetic>
          <Button asChild variant="link" size="lg">
            <TransitionLink href="/contact">{t("secondary")}</TransitionLink>
          </Button>
        </m.div>
      </div>

      <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
        <m.div
          className="pointer-events-none absolute -top-6 -left-2 z-10 flex items-start gap-1 md:-top-4 md:-left-16"
          {...fade(1.6)}
        >
          <span className="-rotate-6 font-hand text-2xl text-muted-foreground md:text-3xl">{t("note")}</span>
          <Doodle
            name="arrow-curvy"
            draw={introDone}
            delay={1.9}
            className="mt-5 h-12 w-16 scale-y-[-1] rotate-[30deg]"
            tone="muted"
          />
        </m.div>
        <m.div
          className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-md border border-border bg-secondary shadow-2xl shadow-neutral-950/10"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: introDone ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 1.2, ease: ease.inOut, delay: 0.5 }}
        >
          <m.div
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: introDone ? 1 : 1.15 }}
            transition={{ duration: 1.8, ease: ease.out, delay: 0.5 }}
          >
            <Image
              src={site.headshot}
              alt={about("alt")}
              fill
              priority
              sizes="(min-width: 768px) 440px, 90vw"
              className="object-cover"
            />
          </m.div>
        </m.div>
      </div>

      <m.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 2.2 }}
      >
        <span className="label-mono text-muted-foreground">{common("scroll")}</span>
        <m.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <Doodle name="arrow-down" draw={introDone} delay={2.3} className="h-10 w-4" tone="muted" />
        </m.span>
      </m.div>
    </section>
  );
}
