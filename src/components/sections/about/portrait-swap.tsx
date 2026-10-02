"use client";

import * as React from "react";
import Image from "next/image";
import { m } from "motion/react";
import { useTranslations } from "next-intl";

import { Peep } from "@/components/illustrations/peep/peep";
import { SketchFrame } from "@/components/illustrations/sketch-frame";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";

/**
 * "The real me / the drawn me": hover or tap wipes between the photo and the
 * illustration with a hand-drawn edge.
 */
export function PortraitSwap() {
  const t = useTranslations("About.photo");
  const [real, setReal] = React.useState(false);

  return (
    <figure className="flex flex-col gap-4">
      <button
        type="button"
        onPointerEnter={(e) => e.pointerType === "mouse" && setReal(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setReal(false)}
        onClick={() => setReal((r) => !r)}
        aria-pressed={real}
        aria-label={t("hint")}
        className="group relative aspect-[4/5] w-full cursor-pointer rounded-md"
      >
        <SketchFrame />
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden rounded-md border border-border bg-card px-6 pt-10">
          <Peep pose="thinking" className="w-full" />
        </div>
        <m.div
          className="absolute inset-0 overflow-hidden rounded-md bg-secondary"
          initial={false}
          animate={{ clipPath: real ? "circle(150% at 100% 100%)" : "circle(0% at 100% 100%)" }}
          transition={{ duration: 0.9, ease: ease.inOut }}
        >
          {site.portrait ? (
            <Image
              src={site.portrait}
              alt={t("alt")}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="photo-mono object-cover object-[50%_18%]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <svg
                viewBox="0 0 64 64"
                aria-hidden
                className="size-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 22c0-3 2-5 5-5h8l4-6h14l4 6h8c3 0 5 2 5 5v26c0 3-2 5-5 5H13c-3 0-5-2-5-5Z" />
                <path d="M32 26c6 0 10 4 10 9.5S38 45 32 45s-10-4-10-9.5S26 26 32 26Z" />
              </svg>
              <span className="font-hand text-2xl">{t("pending")}</span>
            </div>
          )}
        </m.div>
      </button>
      <figcaption className="flex items-center justify-between">
        <span className="label-mono text-muted-foreground">{real ? t("real") : t("drawn")}</span>
        <span className="font-hand text-lg text-muted-foreground">{t("hint")}</span>
      </figcaption>
    </figure>
  );
}
