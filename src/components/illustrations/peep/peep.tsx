"use client";

import * as React from "react";
import { animate, m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { Brows, Ears, Eyes, FaceShape, Hair, Mouth, Neck, Nose, Suit, type BrowMood, type PeepFace } from "./parts";
import {
  CoffeeProps,
  EnvelopeProps,
  LaptopProps,
  MapProps,
  SignProps,
  ThinkingArm,
  WaveForearm,
  WaveUpperArm,
} from "./poses";

export type PeepPose = "laptop" | "wave" | "thinking" | "coffee" | "envelope" | "sign" | "lost";

const poseDefaults: Record<PeepPose, { face: PeepFace; brows: BrowMood; lookAt: boolean }> = {
  laptop: { face: "smile", brows: "neutral", lookAt: true },
  wave: { face: "grin", brows: "raised", lookAt: true },
  thinking: { face: "neutral", brows: "raised", lookAt: false },
  coffee: { face: "smile", brows: "neutral", lookAt: true },
  envelope: { face: "grin", brows: "neutral", lookAt: true },
  sign: { face: "grin", brows: "raised", lookAt: true },
  lost: { face: "unsure", brows: "confused", lookAt: true },
};

type PeepProps = {
  pose?: PeepPose;
  face?: PeepFace;
  brows?: BrowMood;
  /** Text on the sign (pose="sign"). */
  signText?: string;
  /** Wave now (pose="wave"). Also waves on hover. */
  wave?: boolean;
  /** Draw the lines in when scrolled into view. */
  drawIn?: boolean;
  /** Hold the draw-in until true (e.g. until the preloader finishes). */
  play?: boolean;
  /** Head/eyes follow the pointer. */
  lookAt?: boolean;
  /** Hand-drawn line wobble. */
  boil?: boolean;
  className?: string;
  title?: string;
};

/**
 * Toluwalope's illustrated character (traced from his photos). Blinks,
 * breathes, follows the cursor, waves, and draws itself in.
 */
export function Peep({
  pose = "laptop",
  face,
  brows,
  signText = "hi!",
  wave = false,
  drawIn = true,
  play = true,
  lookAt,
  boil = true,
  className,
  title,
}: PeepProps) {
  const t = useTranslations("Peep");
  const defaults = poseDefaults[pose];
  const ref = React.useRef<SVGSVGElement>(null);
  const uid = React.useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const visible = useInView(ref);
  const follow = (lookAt ?? defaults.lookAt) && !reduce;

  const [drawn, setDrawn] = React.useState(!drawIn);
  const playing = !drawn && inView && play;
  const drawState = drawn || reduce ? "done" : playing ? "play" : "pending";

  React.useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setDrawn(true), 2000);
    return () => clearTimeout(id);
  }, [playing]);

  /* Blink at random intervals (only while on screen). */
  const blink = useMotionValue(1);
  React.useEffect(() => {
    if (reduce || !visible) return;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      const double = Math.random() < 0.2;
      animate(blink, double ? [1, 0.08, 1, 0.08, 1] : [1, 0.08, 1], { duration: double ? 0.42 : 0.18 });
      timer = setTimeout(next, 2000 + Math.random() * 4000);
    };
    timer = setTimeout(next, 1200 + Math.random() * 2000);
    return () => clearTimeout(timer);
  }, [reduce, visible, blink]);

  /* Look at the pointer. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, spring.soft);
  const sy = useSpring(py, spring.soft);
  const headRotate = useTransform(sx, [-1, 1], [-5, 5]);
  const headY = useTransform(sy, [-1, 1], [-2, 2]);
  const irisX = useTransform(sx, [-1, 1], [-3.5, 3.5]);
  const irisY = useTransform(sy, [-1, 1], [-1.6, 1.6]);

  React.useEffect(() => {
    if (!follow) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [follow, px, py]);

  /* Waving */
  const [hoverWave, setHoverWave] = React.useState(0);
  const waving = pose === "wave" && (wave || hoverWave > 0);
  const lookingUp = pose === "thinking";
  const holding = pose === "coffee" || pose === "envelope" || pose === "sign" || pose === "lost";

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 440"
      role="img"
      aria-label={title ?? t(pose)}
      className={cn("peep h-auto w-full overflow-visible select-none", boil && "boil", className)}
      data-draw={drawState}
      onPointerEnter={() => pose === "wave" && setHoverWave((n) => n + 1)}
    >
      <defs>
        {/* Crop the bust at the bottom edge (hands may still rise above the top). */}
        <clipPath id={`${uid}-frame`}>
          <rect x="-200" y="-200" width="800" height="640" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-frame)`}>
        {/* Torso breathes gently */}
        <m.g
          id="torso"
          style={{ originX: 0.5, originY: 1 }}
          animate={reduce ? undefined : { scaleY: [1, 1.01, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="peep-part"
          data-part="body"
        >
          <Neck />
          <Suit
            armsDown={!holding && pose !== "wave" && pose !== "laptop" && pose !== "thinking"}
            tieId={`${uid}-tie`}
          />
        </m.g>

        {pose === "wave" && (
          <g className="peep-part" data-part="arms">
            <WaveUpperArm />
            <m.g
              id="forearm"
              style={{ originX: 0.5, originY: 0.97 }}
              animate={waving && !reduce ? { rotate: [0, -16, 12, -16, 12, 0] } : { rotate: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              key={hoverWave}
            >
              <WaveForearm />
            </m.g>
          </g>
        )}

        {/* Head follows the pointer */}
        <m.g
          id="head"
          style={{ rotate: follow ? headRotate : 0, y: follow ? headY : 0, originX: 0.5, originY: 1 }}
          className="peep-part"
          data-part="head"
        >
          <Ears />
          <FaceShape />
          <Hair clipId={`${uid}-hair`} />
          <Brows mood={brows ?? defaults.brows} />
          <Eyes
            clipId={`${uid}-eye`}
            lookX={follow ? irisX : lookingUp ? -2.5 : 0}
            lookY={follow ? irisY : lookingUp ? -2 : 0}
            blink={blink}
          />
          <Nose />
          <Mouth face={face ?? defaults.face} />
        </m.g>

        <g className="peep-part" data-part="props">
          {pose === "laptop" && <LaptopProps />}
          {pose === "thinking" && <ThinkingArm />}
          {pose === "coffee" && <CoffeeProps />}
          {pose === "envelope" && <EnvelopeProps />}
          {pose === "sign" && <SignProps text={signText} />}
          {pose === "lost" && <MapProps />}
        </g>
      </g>
    </svg>
  );
}
