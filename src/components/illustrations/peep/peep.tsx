"use client";

import * as React from "react";
import { animate, m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import {
  Brows,
  Cheeks,
  Drawstrings,
  Ears,
  FaceShape,
  Glasses,
  Hair,
  Hood,
  Mouth,
  Neck,
  Nose,
  Torso,
  type BrowMood,
  type PeepFace,
} from "./parts";
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

const poseDefaults: Record<PeepPose, { face: PeepFace; brows: BrowMood; armsDown: boolean; lookAt: boolean }> = {
  laptop: { face: "smile", brows: "neutral", armsDown: false, lookAt: true },
  wave: { face: "grin", brows: "raised", armsDown: false, lookAt: true },
  thinking: { face: "focused", brows: "raised", armsDown: false, lookAt: false },
  coffee: { face: "smile", brows: "neutral", armsDown: false, lookAt: true },
  envelope: { face: "grin", brows: "neutral", armsDown: false, lookAt: true },
  sign: { face: "grin", brows: "raised", armsDown: false, lookAt: true },
  lost: { face: "unsure", brows: "confused", armsDown: false, lookAt: true },
};

type PeepProps = {
  pose?: PeepPose;
  face?: PeepFace;
  brows?: BrowMood;
  glasses?: boolean;
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
 * Toluwalope's illustrated character. Blinks, breathes, follows the cursor,
 * waves, and draws itself in.
 */
export function Peep({
  pose = "laptop",
  face,
  brows,
  glasses = false,
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
  const eyeScale = useMotionValue(1);
  React.useEffect(() => {
    if (reduce || !visible) return;
    let timer: ReturnType<typeof setTimeout>;
    const blink = () => {
      const double = Math.random() < 0.2;
      animate(eyeScale, double ? [1, 0.1, 1, 0.1, 1] : [1, 0.1, 1], { duration: double ? 0.42 : 0.18 });
      timer = setTimeout(blink, 2000 + Math.random() * 4000);
    };
    timer = setTimeout(blink, 1200 + Math.random() * 2000);
    return () => clearTimeout(timer);
  }, [reduce, visible, eyeScale]);

  /* Look at the pointer. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, spring.soft);
  const sy = useSpring(py, spring.soft);
  const headRotate = useTransform(sx, [-1, 1], [-6, 6]);
  const headY = useTransform(sy, [-1, 1], [-2, 2]);
  const pupilX = useTransform(sx, [-1, 1], [-3, 3]);
  const pupilY = useTransform(sy, [-1, 1], [-2.5, 2.5]);

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

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 440"
      role="img"
      aria-label={title ?? t(pose === "lost" ? "lost" : pose)}
      className={cn("peep h-auto w-full overflow-visible select-none", boil && "boil", className)}
      data-draw={drawState}
      onPointerEnter={() => pose === "wave" && setHoverWave((n) => n + 1)}
    >
      {/* Torso breathes gently */}
      <m.g
        id="torso"
        style={{ originX: 0.5, originY: 1 }}
        animate={reduce ? undefined : { scaleY: [1, 1.012, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="peep-part"
        data-part="body"
      >
        <Torso armsDown={defaults.armsDown && pose !== "wave"} />
        <Hood />
        <Neck />
        <Drawstrings />
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
        <Hair />
        <Brows mood={brows ?? defaults.brows} />
        <m.g id="eyes" style={{ x: follow ? pupilX : lookingUp ? -2 : 0, y: follow ? pupilY : lookingUp ? -3 : 0 }}>
          <m.ellipse cx="179" cy="156" rx="4.4" ry="5.4" fill="var(--peep-line)" style={{ scaleY: eyeScale }} />
          <m.ellipse cx="221" cy="156" rx="4.4" ry="5.4" fill="var(--peep-line)" style={{ scaleY: eyeScale }} />
        </m.g>
        <Nose />
        <Mouth face={face ?? defaults.face} />
        {(face ?? defaults.face) === "grin" && <Cheeks />}
        {glasses && <Glasses />}
      </m.g>

      <g className="peep-part" data-part="props">
        {pose === "laptop" && <LaptopProps />}
        {pose === "thinking" && <ThinkingArm />}
        {pose === "coffee" && <CoffeeProps />}
        {pose === "envelope" && <EnvelopeProps />}
        {pose === "sign" && <SignProps text={signText} />}
        {pose === "lost" && <MapProps />}
      </g>
    </svg>
  );
}
