/*
 * Parts for Toluwalope's illustrated character.
 *
 * The head is traced from his headshot (see scripts/peep/head-trace.tsv);
 * the outfit follows his portrait: navy shawl-lapel suit, white shirt,
 * diamond-pattern tie and a steel wristwatch.
 *
 * Rig spec (viewBox 0 0 400 440):
 *  - line art: one stroke family (LINE / FINE), round caps and joins
 *  - colours only from --peep-line, --peep-fill and --brand, so it re-themes
 *  - named groups (#head, #eyes, #forearm …) for animation
 */
import * as React from "react";
import { m, type MotionValue } from "motion/react";
import { head } from "./head-paths";

export const LINE = 3;
export const FINE = 2;

/*
 * Line art only, Open Peeps style: every shape is an ink outline over a
 * paper fill (the fill just hides what's behind it). No tones or shading.
 */
export const ink = {
  stroke: "var(--peep-line)",
  strokeWidth: LINE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
export const line = { ...ink, fill: "none" };
export const fine = { ...line, strokeWidth: FINE };
export const paper = { ...ink, fill: "var(--peep-fill)" };

/* ─── Body: suit ────────────────────────────────────────────────────────── */

export function Suit({ armsDown = true, tieId }: { armsDown?: boolean; tieId: string }) {
  return (
    <>
      {/* Jacket */}
      <path
        {...paper}
        d="M62 440 C 62 380, 72 322, 106 296 C 128 280, 150 266, 170 250 L 232 248 C 252 264, 274 280, 296 296 C 330 322, 340 380, 340 440 Z"
      />
      {/* Shirt front between the lapels */}
      <path {...paper} d="M170 250 C 178 292, 190 344, 201 396 C 212 344, 224 292, 232 248 Z" />
      <Tie id={tieId} />
      {/* Collar wings */}
      <path {...paper} d="M170 248 C 174 262, 182 274, 191 286 L 200 266 C 190 260, 180 252, 175 238 Z" />
      <path {...paper} d="M232 246 C 228 260, 220 272, 211 284 L 202 266 C 212 260, 222 252, 227 236 Z" />
      {/* Shawl lapels with their satin facing line */}
      <path
        {...paper}
        d="M166 250 C 150 264, 140 284, 137 304 C 150 334, 176 370, 200 398 C 190 352, 179 302, 172 252 Z"
      />
      <path
        {...paper}
        d="M236 248 C 252 262, 262 282, 265 302 C 252 334, 226 370, 202 398 C 212 352, 223 302, 230 250 Z"
      />
      <path {...fine} d="M148 296 C 162 324, 179 352, 194 380 M254 294 C 240 322, 223 350, 208 378" />
      {/* Front edges, button, breast pocket */}
      <path {...line} d="M201 398 C 196 412, 191 426, 187 440 M201 398 C 206 412, 211 426, 215 440" />
      <circle {...paper} strokeWidth={FINE} cx="203" cy="407" r="3" />
      <path {...fine} d="M244 338 L 282 332" />
      {armsDown && (
        <>
          <path {...line} d="M104 324 C 110 364, 112 404, 110 440" />
          <path {...line} d="M298 324 C 292 364, 290 404, 292 440" />
        </>
      )}
    </>
  );
}

/** Diamond-pattern tie, drawn as tiny brand-coloured outlines. */
function Tie({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="var(--peep-fill)" />
          <rect x="2" y="2" width="3" height="3" fill="none" stroke="var(--brand)" strokeWidth="1" />
        </pattern>
      </defs>
      <path {...ink} fill={`url(#${id})`} d="M197 276 L 206 276 L 215 382 L 201.5 398 L 188 382 Z" />
      <path {...paper} d="M195 263 L 208 263 L 206 277 L 197 277 Z" />
    </>
  );
}

export function Neck() {
  return (
    <path
      {...paper}
      d="M178 200 C 179 222, 178 240, 174 258 C 192 270, 212 270, 230 256 C 226 238, 225 220, 227 196 Z"
    />
  );
}

/* ─── Head (traced) ─────────────────────────────────────────────────────── */

export type PeepFace = "neutral" | "smile" | "grin" | "surprised" | "unsure";
export type BrowMood = "neutral" | "raised" | "confused";

export function Ears() {
  return (
    <>
      <path {...paper} d={head.earL} />
      <path {...fine} d={head.earLin} />
      <path {...paper} d={head.earR} />
      <path {...fine} d={head.earRin} />
    </>
  );
}

export function FaceShape() {
  return (
    <>
      <path {...paper} d={head.face} />
      {/* Chin crease under the lower lip */}
      <path {...fine} d="M187 208 C 192 210.5, 199 210.5, 204 208" />
    </>
  );
}

/** Tall, short-cropped top with a sharp line-up; coils drawn as small strokes. */
export function Hair({ clipId }: { clipId: string }) {
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <path d={head.hair} />
        </clipPath>
      </defs>
      <path {...paper} d={head.hair} />
      <path
        clipPath={`url(#${clipId})`}
        d={TEXTURE}
        fill="none"
        stroke="var(--peep-line)"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* Faded sides */}
      <path
        {...fine}
        strokeWidth={1.4}
        d="M147 122 l 1 5 M150 121 l 1 6 M149 130 l 1 5 M252 114 l -0.5 5 M250 121 l -0.6 6"
      />
    </>
  );
}

// Evenly spread short coils (jittered grid), staggered row by row.
const TEXTURE = (() => {
  const marks: string[] = [];
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let row = 0, y = 59; y < 104; row++, y += 6.5) {
    for (let x = 140 + (row % 2) * 4.5; x < 262; x += 9) {
      const jx = x + (rand() - 0.5) * 3;
      const jy = y + (rand() - 0.5) * 2.5;
      // Keep a clean band above the line-up so the hairline reads crisply.
      if (jy > 103 - Math.abs(jx - 201) * 0.11) continue;
      const s = 1.5 + rand() * 0.8;
      marks.push(`M${jx.toFixed(1)} ${jy.toFixed(1)} q ${s} ${-s * 1.1} ${s * 2} 0`);
    }
  }
  return marks.join(" ");
})();

export function Brows({ mood = "neutral" }: { mood?: BrowMood }) {
  const left = mood === "neutral" ? head.browN_L : head.browU_L;
  const right = mood === "raised" ? head.browU_R : mood === "confused" ? head.browC_R : head.browN_R;
  return (
    <g {...line} strokeWidth={3.4}>
      <path d={left} />
      <path d={right} />
    </g>
  );
}

/** Almond eye outlines with pupils (clipped so they can look around). */
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
      <m.g style={{ scaleY: blink, originY: 0.5 }}>
        <g clipPath={`url(#${clipId}-l)`}>
          <m.circle cx="170.9" cy="152" r="3.6" fill="var(--peep-line)" style={{ x: lookX, y: lookY }} />
        </g>
        <g clipPath={`url(#${clipId}-r)`}>
          <m.circle cx="217.8" cy="149.4" r="3.6" fill="var(--peep-line)" style={{ x: lookX, y: lookY }} />
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
      <path {...line} strokeWidth={2.6} d={head.nose} />
      <path {...fine} d={`${head.nostrilL} ${head.nostrilR}`} />
    </>
  );
}

export function Mouth({ face = "neutral" }: { face?: PeepFace }) {
  switch (face) {
    case "grin":
      return (
        <>
          <path {...paper} strokeWidth={2.6} d={head.grinOut} />
          <path {...fine} d={head.grinIn} />
          <path {...fine} d="M175.6 197.8 C 186 200.4, 204 200.4, 213 197.5" />
        </>
      );
    case "smile":
      return (
        <>
          <path {...paper} strokeWidth={2.4} d={head.lipBotS} />
          <path {...paper} strokeWidth={2.4} d={head.lipTopS} />
          <path {...line} strokeWidth={2.6} d={head.lipLineS} />
        </>
      );
    case "surprised":
      return (
        <>
          <ellipse {...paper} strokeWidth={2.4} cx="194" cy="196" rx="8" ry="10" />
          <ellipse {...fine} cx="194" cy="196.5" rx="4.4" ry="6.2" />
        </>
      );
    case "unsure":
      return (
        <>
          <path {...paper} strokeWidth={2.4} d={head.lipBotN} />
          <path {...paper} strokeWidth={2.4} d={head.lipTopN} />
          <path {...line} strokeWidth={2.6} d={head.lipLineU} />
        </>
      );
    default:
      return (
        <>
          <path {...paper} strokeWidth={2.4} d={head.lipBotN} />
          <path {...paper} strokeWidth={2.4} d={head.lipTopN} />
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
      <path {...paper} d="M12 -20 C 20 -24, 27 -32, 31 -42 C 33 -48, 26 -51, 22 -45 C 19 -38, 14 -33, 7 -30 Z" />
      {/* Fingers: little, ring, middle, index — slightly fanned */}
      <rect {...paper} x="-21" y="-56" width="9" height="28" rx="4.5" transform="rotate(-10 -16 -30)" />
      <rect {...paper} x="-12" y="-68" width="9.4" height="38" rx="4.7" transform="rotate(-4 -7 -32)" />
      <rect {...paper} x="-2.4" y="-72" width="9.6" height="42" rx="4.8" />
      <rect {...paper} x="7.4" y="-66" width="9.2" height="36" rx="4.6" transform="rotate(5 12 -32)" />
      {/* Palm (covers the finger bases) */}
      <path {...paper} d="M-19 -1 C -22 -14, -22 -27, -19 -36 C -8 -40, 6 -40, 17 -35 C 19 -26, 19 -14, 16 -1 Z" />
      <path
        {...fine}

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
        <path {...paper} d="M-2 -16 C 0 -30, -2 -44, -8 -54 C -11 -60, -4 -63, -1 -57 C 6 -46, 9 -30, 8 -15 Z" />
      )}
      <path
        {...paper}
        d="M-15 -10 C -15 -18, -8 -21, 2 -21 C 12 -21, 17 -15, 17 -6 L 17 8 C 17 16, 11 19, 1 19 C -9 19, -15 15, -15 7 Z"
      />
      <path {...fine} d="M-15 -2 L -5 -2 M-15 7 L -5 7 M-4 -21 C 6 -20, 14 -14, 17 -6" />
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
      <path {...paper} d={`M${pts} Z`} />
      <Cuff x={wx} y={wy} rotate={angle} watch={watch} />
    </>
  );
}

/** White shirt cuff + jacket sleeve end, oriented along `rotate`. */
export function Cuff(p: Place & { watch?: boolean }) {
  return (
    <g transform={place(p)}>
      <path {...paper} d="M-12 -7 L 12 -7 L 12.5 1 L -12.5 1 Z" />
      {p.watch && (
        <>
          <path {...ink} strokeWidth={FINE} fill="var(--peep-fill)" d="M-12 -14 L 12 -14 L 12 -7 L -12 -7 Z" />
          <circle cx="0" cy="-10.5" r="7" fill="var(--peep-fill)" stroke="var(--peep-line)" strokeWidth={FINE} />
          <path {...fine} strokeWidth={1.2} d="M0 -10.5 L 0 -14.5 M0 -10.5 L 3 -9.3" />
        </>
      )}
    </g>
  );
}
