/*
 * Parts for Toluwalope's illustrated character.
 *
 * The head is traced from his headshot (see scripts/peep/head-trace.tsv);
 * the outfit follows his portrait: navy shawl-lapel suit, white shirt,
 * diamond-pattern tie and a steel wristwatch.
 *
 * Rig spec (viewBox 0 0 400 440):
 *  - one stroke family (LINE / FINE), round caps and joins
 *  - colours only from CSS variables (--peep-*, --brand), so it re-themes
 *  - named groups (#head, #eyes, #forearm …) for animation
 */
import * as React from "react";
import { m, type MotionValue } from "motion/react";
import { head } from "./head-paths";

export const LINE = 3;
export const FINE = 2;

export const ink = {
  stroke: "var(--peep-line)",
  strokeWidth: LINE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
export const line = { ...ink, fill: "none" };
export const fine = { ...line, strokeWidth: FINE };
export const paper = { ...ink, fill: "var(--peep-fill)" };
export const skin = { ...ink, fill: "var(--peep-skin)" };
export const suit = { ...ink, fill: "var(--peep-suit)" };
export const lapel = { ...ink, fill: "var(--peep-lapel)" };
export const shirt = { ...ink, fill: "var(--peep-shirt)" };
export const detail = {
  fill: "none",
  stroke: "var(--peep-suit-detail)",
  strokeWidth: FINE,
  strokeLinecap: "round" as const,
};
const solid = (v: string) => ({ fill: `var(${v})`, stroke: "none" });

/* ─── Body: suit ────────────────────────────────────────────────────────── */

export function Suit({ armsDown = true, tieId }: { armsDown?: boolean; tieId: string }) {
  return (
    <>
      {/* Jacket */}
      <path
        {...suit}
        d="M62 440 C 62 380, 72 322, 106 296 C 128 280, 150 266, 170 250 L 232 248 C 252 264, 274 280, 296 296 C 330 322, 340 380, 340 440 Z"
      />
      {/* Shirt front between the lapels */}
      <path {...shirt} d="M170 250 C 178 292, 190 344, 201 396 C 212 344, 224 292, 232 248 Z" />
      <Tie id={tieId} />
      {/* Collar wings */}
      <path {...shirt} d="M170 248 C 174 262, 182 274, 191 286 L 200 266 C 190 260, 180 252, 175 238 Z" />
      <path {...shirt} d="M232 246 C 228 260, 220 272, 211 284 L 202 266 C 212 260, 222 252, 227 236 Z" />
      {/* Shawl lapels (satin) */}
      <path
        {...lapel}
        d="M166 250 C 150 264, 140 284, 137 304 C 150 334, 176 370, 200 398 C 190 352, 179 302, 172 252 Z"
      />
      <path
        {...lapel}
        d="M236 248 C 252 262, 262 282, 265 302 C 252 334, 226 370, 202 398 C 212 352, 223 302, 230 250 Z"
      />
      <path {...detail} d="M146 296 C 160 324, 178 352, 194 380 M256 294 C 242 322, 224 350, 208 378" />
      {/* Front edges, button, pocket */}
      <path {...line} d="M201 398 C 196 412, 191 426, 187 440 M201 398 C 206 412, 211 426, 215 440" />
      <circle cx="203" cy="407" r="3" fill="var(--peep-lapel)" stroke="var(--peep-line)" strokeWidth={FINE} />
      <path {...detail} d="M244 338 L 282 332" />
      {armsDown && (
        <>
          <path {...line} d="M104 324 C 110 364, 112 404, 110 440" />
          <path {...line} d="M298 324 C 292 364, 290 404, 292 440" />
        </>
      )}
    </>
  );
}

/** Diamond-pattern tie — the pattern carries the brand colour. */
function Tie({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="var(--peep-tie)" />
          <rect x="1.6" y="1.6" width="3.2" height="3.2" fill="var(--brand)" opacity="0.9" />
        </pattern>
      </defs>
      <path {...ink} fill={`url(#${id})`} d="M197 276 L 206 276 L 215 382 L 201.5 398 L 188 382 Z" />
      <path {...ink} fill="var(--peep-tie)" d="M195 263 L 208 263 L 206 277 L 197 277 Z" />
    </>
  );
}

export function Neck() {
  return (
    <>
      <path
        {...skin}
        d="M178 200 C 179 222, 178 240, 174 258 C 192 270, 212 270, 230 256 C 226 238, 225 220, 227 196 Z"
      />
      <path
        {...solid("--peep-skin-shade")}
        d="M178.5 212 C 192 230, 212 230, 226.5 206 L 226 228 C 212 240, 192 240, 178 230 Z"
      />
    </>
  );
}

/* ─── Head (traced) ─────────────────────────────────────────────────────── */

export type PeepFace = "neutral" | "smile" | "grin" | "surprised" | "unsure";
export type BrowMood = "neutral" | "raised" | "confused";

export function Ears() {
  return (
    <>
      <path {...skin} d={head.earL} />
      <path {...fine} stroke="var(--peep-skin-line)" d={head.earLin} />
      <path {...skin} d={head.earR} />
      <path {...fine} stroke="var(--peep-skin-line)" d={head.earRin} />
    </>
  );
}

export function FaceShape() {
  return (
    <>
      <path {...skin} d={head.face} />
      <path {...solid("--peep-skin-shade")} d={head.jawShade} />
      <path {...solid("--peep-skin-shade")} opacity={0.55} d={head.stubble} />
      <path {...fine} strokeWidth={1.6} stroke="var(--peep-skin-light)" opacity={0.7} d={head.foreheadHi} />
    </>
  );
}

/** Short, tall-topped cut with a sharp line-up and faded sides. */
export function Hair() {
  return (
    <>
      <path {...solid("--peep-hair-fade")} d={head.fadeL} />
      <path {...solid("--peep-hair-fade")} d={head.fadeR} />
      <path {...ink} fill="var(--peep-hair)" d={head.hair} />
      <HairTexture />
      <path {...ink} strokeWidth={LINE + 0.4} fill="none" d={head.hairline} />
    </>
  );
}

// Deterministic short coils across the crown.
const TEXTURE = (() => {
  const marks: string[] = [];
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 150; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    const x = 201 + Math.cos(a) * r * 50;
    const y = 82 + Math.sin(a) * r * 26;
    if (y > 100 - Math.abs(x - 201) * 0.12) continue;
    const s = 1.2 + rand() * 1.2;
    marks.push(`M${x.toFixed(1)} ${y.toFixed(1)} q ${s} ${-s} ${s * 2} 0`);
  }
  return marks.join(" ");
})();

function HairTexture() {
  return <path d={TEXTURE} fill="none" stroke="var(--peep-hair-texture)" strokeWidth={1.1} strokeLinecap="round" />;
}

export function Brows({ mood = "neutral" }: { mood?: BrowMood }) {
  const left = mood === "neutral" ? head.browN_L : head.browU_L;
  const right = mood === "raised" ? head.browU_R : mood === "confused" ? head.browC_R : head.browN_R;
  return (
    <g {...line} stroke="var(--peep-hair)" strokeWidth={3.4}>
      <path d={left} />
      <path d={right} />
    </g>
  );
}

/** Eye whites, irises (clipped so they can look around) and lids. */
export function Eyes({
  clipId,
  lookX,
  lookY,
  blink,
}: {
  clipId: string;
  lookX: MotionValue<number> | number;
  lookY: MotionValue<number> | number;
  blink: MotionValue<number>;
}) {
  return (
    <g id="eyes">
      <defs>
        <clipPath id={`${clipId}-l`}>
          <path d={head.eyeL} />
        </clipPath>
        <clipPath id={`${clipId}-r`}>
          <path d={head.eyeR} />
        </clipPath>
      </defs>
      <path {...fine} strokeWidth={1.3} stroke="var(--peep-skin-shade)" d={`${head.bagL} ${head.bagR}`} />
      <m.g style={{ scaleY: blink, originY: 0.5 }}>
        <path fill="var(--peep-eye)" d={head.eyeL} />
        <path fill="var(--peep-eye)" d={head.eyeR} />
        <g clipPath={`url(#${clipId}-l)`}>
          <m.g style={{ x: lookX, y: lookY }}>
            <circle cx="170.9" cy="152" r="4.3" fill="var(--peep-iris)" />
            <circle cx="172.2" cy="150.6" r="1.1" fill="var(--peep-eye)" />
          </m.g>
        </g>
        <g clipPath={`url(#${clipId}-r)`}>
          <m.g style={{ x: lookX, y: lookY }}>
            <circle cx="217.8" cy="149.4" r="4.3" fill="var(--peep-iris)" />
            <circle cx="219.1" cy="148" r="1.1" fill="var(--peep-eye)" />
          </m.g>
        </g>
        <path {...fine} d={`${head.eyeL} ${head.eyeR}`} />
      </m.g>
      <path {...line} strokeWidth={3.2} d={`${head.lidL} ${head.lidR}`} />
    </g>
  );
}

export function Nose() {
  return (
    <>
      <path {...solid("--peep-skin-shade")} d={head.noseShade} />
      <path {...line} strokeWidth={2.6} d={head.nose} />
      <path {...fine} stroke="var(--peep-skin-light)" d={head.noseTip} />
      <path {...solid("--peep-iris")} d={`${head.nostrilL} ${head.nostrilR}`} />
    </>
  );
}

export function Mouth({ face = "neutral" }: { face?: PeepFace }) {
  switch (face) {
    case "grin":
      return (
        <>
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip)" d={head.grinOut} />
          <path fill="var(--peep-iris)" d={head.grinIn} />
          <path fill="var(--peep-eye)" d={head.grinTeeth} />
        </>
      );
    case "smile":
      return (
        <>
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip)" d={head.lipBotS} />
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip-top)" d={head.lipTopS} />
          <path {...line} strokeWidth={2.6} d={head.lipLineS} />
        </>
      );
    case "surprised":
      return (
        <>
          <ellipse {...ink} strokeWidth={2.4} fill="var(--peep-lip)" cx="194" cy="196" rx="8" ry="10" />
          <ellipse fill="var(--peep-iris)" cx="194" cy="196.5" rx="4.4" ry="6.2" />
        </>
      );
    case "unsure":
      return (
        <>
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip)" d={head.lipBotN} />
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip-top)" d={head.lipTopN} />
          <path {...line} strokeWidth={2.6} d={head.lipLineU} />
        </>
      );
    default:
      return (
        <>
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip)" d={head.lipBotN} />
          <path {...ink} strokeWidth={2.4} fill="var(--peep-lip-top)" d={head.lipTopN} />
          <path {...line} strokeWidth={2.6} d={head.lipLineN} />
        </>
      );
  }
}

/* ─── Hands ─────────────────────────────────────────────────────────────── */

type Place = { x: number; y: number; rotate?: number; flip?: boolean; scale?: number };
const place = ({ x, y, rotate = 0, flip = false, scale = 1 }: Place) =>
  `translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -scale : scale} ${scale})`;

/** Open palm facing the viewer, wrist at the origin, fingers up (≈ 70 units long). */
export function OpenHand(p: Place) {
  return (
    <g transform={place(p)}>
      {/* Thumb */}
      <path {...skin} d="M12 -20 C 20 -24, 27 -32, 31 -42 C 33 -48, 26 -51, 22 -45 C 19 -38, 14 -33, 7 -30 Z" />
      {/* Fingers: little, ring, middle, index — slightly fanned */}
      <rect {...skin} x="-21" y="-56" width="9" height="28" rx="4.5" transform="rotate(-10 -16 -30)" />
      <rect {...skin} x="-12" y="-68" width="9.4" height="38" rx="4.7" transform="rotate(-4 -7 -32)" />
      <rect {...skin} x="-2.4" y="-72" width="9.6" height="42" rx="4.8" />
      <rect {...skin} x="7.4" y="-66" width="9.2" height="36" rx="4.6" transform="rotate(5 12 -32)" />
      {/* Palm (covers the finger bases) */}
      <path {...skin} d="M-19 -1 C -22 -14, -22 -27, -19 -36 C -8 -40, 6 -40, 17 -35 C 19 -26, 19 -14, 16 -1 Z" />
      <path
        {...fine}
        stroke="var(--peep-skin-line)"
        d="M-12 -20 C -5 -16, 3 -16, 10 -22 M-14 -30 C -6 -28, 4 -28, 12 -31"
      />
    </g>
  );
}

/**
 * Hand gripping something from the side: knuckles toward the viewer, thumb
 * on top. Origin is the centre of the fist (≈ 34 × 40 units).
 */
export function GripHand({ point = false, ...p }: Place & { point?: boolean }) {
  return (
    <g transform={place(p)}>
      {point && (
        <path {...skin} d="M-2 -16 C 0 -30, -2 -44, -8 -54 C -11 -60, -4 -63, -1 -57 C 6 -46, 9 -30, 8 -15 Z" />
      )}
      <path
        {...skin}
        d="M-15 -10 C -15 -18, -8 -21, 2 -21 C 12 -21, 17 -15, 17 -6 L 17 8 C 17 16, 11 19, 1 19 C -9 19, -15 15, -15 7 Z"
      />
      <path {...fine} stroke="var(--peep-skin-line)" d="M-15 -2 L -5 -2 M-15 7 L -5 7 M-4 -21 C 6 -20, 14 -14, 17 -6" />
    </g>
  );
}

/**
 * A jacket sleeve from elbow to wrist with the shirt cuff (and optionally the
 * watch) at the wrist, perpendicular to the forearm.
 */
export function Forearm({
  elbow,
  wrist,
  width = 30,
  watch = false,
}: {
  elbow: [number, number];
  wrist: [number, number];
  width?: number;
  watch?: boolean;
}) {
  const [ex, ey] = elbow;
  const [wx, wy] = wrist;
  const len = Math.hypot(wx - ex, wy - ey) || 1;
  const ux = (wx - ex) / len;
  const uy = (wy - ey) / len;
  const [nx, ny] = [-uy, ux];
  const we = width / 2;
  const ww = width / 2 - 3;
  const pts = [
    [ex + nx * we, ey + ny * we],
    [wx + nx * ww, wy + ny * ww],
    [wx - nx * ww, wy - ny * ww],
    [ex - nx * we, ey - ny * we],
  ]
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" L ");
  const angle = (Math.atan2(ux, -uy) * 180) / Math.PI;
  return (
    <>
      <path {...suit} d={`M${pts} Z`} />
      <Cuff x={wx} y={wy} rotate={angle} watch={watch} />
    </>
  );
}

/** White shirt cuff + jacket sleeve end, oriented along `rotate`. */
export function Cuff(p: Place & { watch?: boolean }) {
  return (
    <g transform={place(p)}>
      <path {...shirt} d="M-12 -7 L 12 -7 L 12.5 1 L -12.5 1 Z" />
      {p.watch && (
        <>
          <path {...ink} strokeWidth={FINE} fill="var(--peep-watch)" d="M-12 -14 L 12 -14 L 12 -7 L -12 -7 Z" />
          <circle cx="0" cy="-10.5" r="7" fill="var(--peep-eye)" stroke="var(--peep-line)" strokeWidth={FINE} />
          <path {...fine} strokeWidth={1.2} d="M0 -10.5 L 0 -14.5 M0 -10.5 L 3 -9.3" />
        </>
      )}
    </g>
  );
}
