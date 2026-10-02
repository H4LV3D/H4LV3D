/*
 * Open Peeps-style parts for Toluwalope's illustrated character.
 *
 * Rig spec (viewBox 0 0 400 440):
 *  - one stroke width family (LINE / FINE), round caps and joins
 *  - colours only from CSS variables: --peep-line, --peep-fill,
 *    --peep-shade, --peep-hair and --brand, so it re-themes automatically
 *  - named groups (#torso, #head, #eyes, #forearm …) for animation
 *
 * TODO(likeness): hair, face shape and accessories are placeholders until
 * reference photos arrive — swap the HAIR / FACE paths below.
 */
import * as React from "react";

export const LINE = 3.2;
export const FINE = 2.4;

export const ink = {
  stroke: "var(--peep-line)",
  strokeWidth: LINE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
export const paper = { ...ink, fill: "var(--peep-fill)" };
export const line = { ...ink, fill: "none" };
export const fine = { ...line, strokeWidth: FINE };
export const shade = { fill: "var(--peep-shade)", stroke: "none" };
export const solid = { fill: "var(--peep-line)", stroke: "none" };

/* ─── Body ──────────────────────────────────────────────────────────────── */

export function Torso({ armsDown = true }: { armsDown?: boolean }) {
  return (
    <>
      <path
        {...paper}
        d="M68 440 C 68 384, 78 326, 112 298 C 134 280, 158 268, 178 256 L 224 256 C 244 268, 268 280, 290 298 C 324 326, 334 384, 334 440 Z"
      />
      <path {...shade} d="M70 438 C 70 392, 77 344, 98 314 C 102 356, 104 402, 108 438 Z" />
      {armsDown && (
        <>
          <path {...line} d="M104 322 C 110 362, 114 404, 112 440" />
          <path {...line} d="M298 322 C 292 362, 288 404, 290 440" />
        </>
      )}
      {/* Kangaroo pocket */}
      <path {...fine} d="M150 420 C 176 412, 226 412, 252 420 M150 420 L 145 440 M252 420 L 257 440" />
    </>
  );
}

export function Hood() {
  return (
    <>
      <path {...paper} d="M160 254 C 156 290, 178 306, 201 306 C 224 306, 246 290, 242 254 Z" />
      <path {...shade} d="M180 256 C 182 280, 190 289, 201 289 C 212 289, 220 280, 222 256 Z" />
      <path {...fine} d="M180 256 C 182 280, 190 289, 201 289 C 212 289, 220 280, 222 256" />
    </>
  );
}

/** Hoodie drawstrings — one of them carries the brand colour. */
export function Drawstrings() {
  return (
    <>
      <path {...fine} d="M190 300 C 189 316, 187 330, 189 344" />
      <path {...fine} strokeWidth={5} d="M189 344 l -0.6 7" />
      <path {...fine} stroke="var(--brand)" d="M213 300 C 215 314, 216 326, 213 338" />
      <path {...fine} stroke="var(--brand)" strokeWidth={5} d="M213 338 l -0.8 7" />
    </>
  );
}

export function Neck() {
  return (
    <>
      <path
        {...paper}
        d="M183 200 C 184 226, 183 244, 180 262 C 194 270, 208 270, 222 262 C 219 244, 218 226, 219 200 Z"
      />
      <path {...shade} d="M183.5 212 C 194 228, 208 228, 218.5 212 L 219 230 C 207 240, 195 240, 183 230 Z" />
    </>
  );
}

/* ─── Head ──────────────────────────────────────────────────────────────── */

export function Ears() {
  return (
    <>
      <path {...paper} d="M152 146 C 139 139, 131 157, 138 170 C 142 178, 150 179, 155 174 Z" />
      <path {...fine} d="M145 156 C 148 159, 149 165, 146 169" />
      <path {...paper} d="M248 146 C 261 139, 269 157, 262 170 C 258 178, 250 179, 245 174 Z" />
      <path {...fine} d="M255 156 C 252 159, 251 165, 254 169" />
    </>
  );
}

export function FaceShape() {
  return (
    <path
      {...paper}
      d="M200 88 C 232 88, 252 104, 251 130 C 252 160, 250 188, 236 207 C 225 220, 213 226, 201 226 C 190 226, 177 220, 166 207 C 151 188, 148 160, 150 130 C 150 104, 168 88, 200 88 Z"
    />
  );
}

const HAIR =
  "M146 144 C 143 132, 141 120, 142.3 104.7 Q 137.9 95.4, 146.5 91.0 Q 144.6 81.2, 153.5 78.6 Q 152.7 67.6, 162.9 68.3 Q 165.4 59.0, 174.1 60.5 Q 178.1 50.8, 186.7 55.6 Q 192.6 47.8, 200.0 54.0 Q 207.3 48.7, 213.3 55.6 Q 221.9 50.9, 225.9 60.5 Q 234.6 59.1, 237.1 68.3 Q 246.8 68.1, 246.5 78.6 Q 255.2 81.3, 253.5 91.0 Q 261.5 95.7, 257.7 104.7 C 259 120, 257 132, 254 144 C 250 128, 244 117, 233 112 C 222 116, 212 113, 201 110 C 190 114, 178 115, 168 112 C 157 117, 150 128, 146 144 Z";

/** Short coily hair; the little curls are drawn in the paper colour. */
export function Hair() {
  const curls = [
    [160, 84],
    [176, 70],
    [196, 64],
    [216, 68],
    [234, 80],
    [246, 96],
    [152, 102],
    [170, 94],
    [190, 84],
    [210, 86],
    [228, 96],
    [182, 102],
    [204, 100],
    [240, 112],
  ];
  return (
    <>
      <path {...ink} fill="var(--peep-hair)" d={HAIR} />
      <g fill="none" stroke="var(--peep-fill)" strokeWidth={2} strokeLinecap="round">
        {curls.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} c ${i % 2 ? 3 : 2} -4, 8 -4, 9 0`} />
        ))}
      </g>
    </>
  );
}

export type PeepFace = "smile" | "grin" | "surprised" | "focused" | "unsure";
export type BrowMood = "neutral" | "raised" | "confused";

export function Brows({ mood = "neutral" }: { mood?: BrowMood }) {
  const left =
    mood === "raised" || mood === "confused"
      ? "M168 132 C 174 126, 183 126, 189 131"
      : "M168 139 C 174 134, 183 134, 189 137";
  const right =
    mood === "raised"
      ? "M211 131 C 217 126, 226 126, 232 132"
      : mood === "confused"
        ? "M211 139 C 217 138, 226 139, 232 142"
        : "M211 137 C 217 134, 226 134, 232 139";
  return (
    <>
      <path {...line} strokeWidth={3.6} d={left} />
      <path {...line} strokeWidth={3.6} d={right} />
    </>
  );
}

export function Nose() {
  return <path {...fine} d="M201 162 C 197 171, 195 178, 199 181 C 202 183, 206 182, 208 179" />;
}

export function Mouth({ face = "smile" }: { face?: PeepFace }) {
  switch (face) {
    case "grin":
      return (
        <>
          <path
            {...ink}
            fill="var(--peep-line)"
            d="M183 193 C 189 211, 213 212, 219 192 C 206 197, 195 197, 183 193 Z"
          />
          <path
            fill="var(--peep-fill)"
            d="M188 196.5 C 196 198.5, 206 198.5, 214 196 L 213 200 C 205 201.5, 197 201.5, 189 200 Z"
          />
        </>
      );
    case "surprised":
      return <ellipse {...ink} fill="var(--peep-line)" cx="201" cy="200" rx="5.5" ry="7" />;
    case "focused":
      return <path {...line} d="M190 199 C 196 200.5, 205 200.5, 212 198" />;
    case "unsure":
      return <path {...line} d="M187 201 C 192 196, 196 204, 201 199.5 S 210 196, 215 201" />;
    default:
      return <path {...line} d="M185 195 C 193 204, 209 205, 217 194" />;
  }
}

export function Cheeks() {
  return (
    <g {...fine} stroke="var(--peep-shade)">
      <path d="M163 178 l 5 -4 M170 180 l 5 -4" />
      <path d="M227 178 l 5 -4 M234 180 l 5 -4" />
    </g>
  );
}

export function Glasses() {
  return (
    <g {...line} strokeWidth={2.8}>
      <path d="M163 148 C 163 140, 194 140, 194 149 C 194 160, 190 168, 178 168 C 167 168, 163 160, 163 148 Z" />
      <path d="M208 149 C 208 140, 239 140, 239 148 C 239 160, 235 168, 224 168 C 212 168, 208 160, 208 149 Z" />
      <path d="M194 150 C 198 147, 204 147, 208 150 M163 149 L 151 146 M239 148 L 250 145" />
    </g>
  );
}

/* ─── Hands & arms ──────────────────────────────────────────────────────── */

/** A simple mitten hand. `flip` mirrors it horizontally around its own x. */
export function Mitten({ x, y, flip = false, rotate = 0 }: { x: number; y: number; flip?: boolean; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -1 : 1} 1)`}>
      <path {...paper} d="M-12 14 C -18 0, -12 -16, 2 -16 C 14 -16, 18 -2, 14 12 C 10 20, -6 22, -12 14 Z" />
      <path {...fine} d="M-6 -6 C 0 -5, 6 -5, 12 -7 M-7 3 C 0 4, 7 4, 13 2" />
    </g>
  );
}
