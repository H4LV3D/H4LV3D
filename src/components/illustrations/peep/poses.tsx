/*
 * Pose-specific foreground layers (arms, hands and props), drawn over the
 * shared suit and head.
 */
import * as React from "react";
import { Forearm, GripHand, OpenHand, fine, line, paper } from "./parts";

/* ─── MacBook (hero) ────────────────────────────────────────────────────── */

/** Apple logo, centred on (0,0), ~1 unit = 1px at scale 1 (bbox ≈ 32×38). */
const APPLE =
  "M0.2 -9.6 C -2 -9.6, -5 -11.6, -8.4 -11.6 C -13.6 -11.6, -18 -7, -18 0 C -18 9, -12.4 18.6, -7.8 18.6 C -5.2 18.6, -3.6 17, 0 17 C 3.6 17, 4.8 18.6, 8 18.6 C 12.6 18.6, 16.4 12.6, 18 8 C 13.6 6, 11.4 2.8, 11.4 -1.2 C 11.4 -5, 13.4 -8, 16.4 -10 C 13.8 -13, 10.4 -14, 7.8 -14 C 4.4 -14, 2.2 -9.6, 0.2 -9.6 Z M0.4 -14.2 C 0.4 -18.6, 3.6 -22.6, 8 -23 C 8 -18.6, 4.6 -14.6, 0.4 -14.2 Z";

export function LaptopProps() {
  return (
    <g id="laptop">
      {/* Forearms reaching for the keyboard behind the lid */}
      <path {...paper} d="M76 440 C 80 416, 94 396, 128 384 L 134 418 C 114 424, 104 432, 100 440 Z" />
      <path {...paper} d="M326 440 C 322 416, 308 396, 274 384 L 268 418 C 288 424, 298 432, 302 440 Z" />
      {/* Aluminium lid, seen from behind */}
      <path
        {...paper}
        d="M108 440 L 122 352 C 123.4 344, 128.6 340, 136 340 L 266 340 C 273.4 340, 278.6 344, 280 352 L 294 440 Z"
      />
      <path {...fine} d="M126 350 C 127 346, 130 344, 136 344 L 266 344 C 272 344, 275 346, 276 350" />
      <path {...fine} transform="translate(201 386) scale(0.95)" d={APPLE} />
      {/* Coffee */}
      <g id="mug">
        <path
          {...paper}
          d="M318 394 L 320 432 C 320 437, 324 440, 329 440 L 349 440 C 354 440, 357 437, 358 432 L 360 394 Z"
        />
        <path {...line} d="M359 404 C 373 402, 375 426, 358 427" />
        <Steam x={330} y={386} />
      </g>
    </g>
  );
}

function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g {...fine} className="peep-steam" transform={`translate(${x} ${y})`}>
      <path d="M0 0 C -6 -8, 6 -14, 0 -24" />
      <path d="M14 2 C 8 -8, 20 -14, 14 -28" />
    </g>
  );
}

/* ─── Wave ──────────────────────────────────────────────────────────────── */

export function WaveUpperArm() {
  return (
    <>
      <path {...line} d="M104 324 C 110 364, 112 404, 110 440" />
      <path {...paper} d="M276 298 C 298 288, 322 274, 334 252 L 366 264 C 354 298, 330 326, 300 346 Z" />
    </>
  );
}

/** Forearm, cuff, watch and open hand; rotated around the elbow to wave. */
export function WaveForearm() {
  return (
    <>
      <Forearm elbow={[350, 266]} wrist={[352, 196]} width={34} watch />
      <OpenHand x={353} y={178} rotate={6} />
    </>
  );
}

/* ─── Thinking ──────────────────────────────────────────────────────────── */

export function ThinkingArm() {
  return (
    <g id="thinking-arm">
      <path {...line} d="M298 324 C 292 364, 290 404, 292 440" />
      <path {...line} d="M104 324 C 108 350, 106 376, 100 398" />
      <Forearm elbow={[126, 452]} wrist={[178, 266]} width={36} watch />
      {/* Fist resting under the chin */}
      <GripHand x={186} y={240} rotate={-12} scale={1.1} />
    </g>
  );
}

/* ─── Holding things ────────────────────────────────────────────────────── */

/** Upper-arm seams plus forearms rising from the elbows to the hands. */
function HoldingArms({ left, right }: { left: [number, number]; right: [number, number] }) {
  const [lx, ly] = left;
  const [rx, ry] = right;
  return (
    <>
      <path {...line} d="M104 324 C 108 352, 106 382, 98 410" />
      <path {...line} d="M298 324 C 294 352, 296 382, 304 410" />
      <Forearm elbow={[78, 450]} wrist={[lx - 10, ly + 16]} watch />
      <Forearm elbow={[324, 450]} wrist={[rx + 10, ry + 16]} />
    </>
  );
}

export function CoffeeProps() {
  return (
    <g id="coffee">
      <HoldingArms left={[166, 368]} right={[236, 368]} />
      <path
        {...paper}
        d="M176 316 L 179 382 C 180 389, 185 393, 192 393 L 211 393 C 218 393, 223 389, 224 382 L 227 316 Z"
      />
      <path {...fine} d="M177 326 L 226 326" />
      <Steam x={194} y={304} />
      <GripHand x={168} y={362} rotate={-10} />
      <GripHand x={234} y={362} rotate={10} flip />
    </g>
  );
}

export function EnvelopeProps() {
  return (
    <g id="envelope">
      <HoldingArms left={[150, 376]} right={[252, 370]} />
      <g transform="rotate(-6 201 352)">
        <path {...paper} d="M142 314 L 260 314 L 260 390 L 142 390 Z" />
        <path {...line} d="M142 314 L 201 356 L 260 314" />
        <path {...fine} d="M142 390 L 188 350 M260 390 L 214 350" />
      </g>
      <GripHand x={148} y={374} rotate={-14} />
      <GripHand x={254} y={368} rotate={12} flip />
    </g>
  );
}

export function SignProps({ text }: { text: string }) {
  return (
    <g id="sign">
      <HoldingArms left={[104, 340]} right={[300, 336]} />
      <path {...paper} d="M84 234 L 318 226 L 322 352 L 90 358 Z" />
      <text
        x="203"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-caveat), var(--font-noto-sans-sc), cursive"
        fontSize="58"
        fill="var(--peep-line)"
        transform="rotate(-2 203 300)"
      >
        {text}
      </text>
      <path {...line} strokeWidth={4} d="M120 324 C 170 316, 240 314, 288 320" />
      <GripHand x={102} y={340} rotate={-10} />
      <GripHand x={302} y={336} rotate={10} flip />
    </g>
  );
}

export function MapProps() {
  return (
    <g id="map">
      <HoldingArms left={[104, 360]} right={[300, 356]} />
      <path {...paper} d="M94 298 L 308 292 L 312 394 L 98 400 Z" />
      <path {...fine} d="M165 296 L 167 398 M236 294 L 239 396" />
      <path {...fine} strokeDasharray="7 7" d="M120 378 C 150 340, 186 386, 222 342 S 270 352, 284 330" />
      <path {...line} strokeWidth={4} d="M278 318 L 294 334 M294 318 L 278 334" />
      {/* Upside-down compass rose — the map is being held the wrong way */}
      <g transform="translate(130 326) rotate(180)" {...fine}>
        <path d="M0 -14 L 5 0 L 0 14 L -5 0 Z" />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="11"
          fill="var(--peep-line)"
          stroke="none"
        >
          N
        </text>
      </g>
      <GripHand x={102} y={360} rotate={-12} />
      <GripHand x={302} y={356} rotate={12} flip />
    </g>
  );
}
