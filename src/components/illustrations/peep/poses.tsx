/*
 * Pose-specific foreground layers (arms and props), drawn on top of the
 * shared torso and head.
 */
import * as React from "react";
import { Mitten, fine, line, paper, shade } from "./parts";

export function LaptopProps() {
  return (
    <g id="laptop">
      {/* Arms reaching forward behind the lid */}
      <path {...line} d="M104 322 C 108 350, 106 376, 100 398" />
      <path {...line} d="M298 322 C 294 350, 296 376, 302 398" />
      <path {...paper} d="M80 440 C 84 418, 98 398, 132 386 L 136 418 C 116 424, 106 432, 102 440 Z" />
      <path {...paper} d="M322 440 C 318 418, 304 398, 270 386 L 266 418 C 286 424, 296 432, 300 440 Z" />
      {/* Lid (back side, facing us) */}
      <path
        {...paper}
        d="M114 440 L 129 344 C 130 338, 134 335, 140 335 L 262 335 C 268 335, 272 338, 273 344 L 288 440 Z"
      />
      <path {...shade} d="M118 436 L 121 416 C 170 420, 232 420, 281 416 L 284 436 Z" />
      {/* Stickers */}
      <circle cx="201" cy="380" r="15" fill="var(--brand)" stroke="var(--peep-line)" strokeWidth={2.4} />
      <path {...fine} d="M194 381 C 197 386, 205 386, 208 381" />
      <g transform="translate(152 364) rotate(-10)">
        <rect {...paper} strokeWidth={2.4} x="-18" y="-10" width="36" height="20" rx="3" />
        <text
          x="0"
          y="4.5"
          textAnchor="middle"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="12"
          fill="var(--peep-line)"
        >
          {"</>"}
        </text>
      </g>
      <path
        {...paper}
        strokeWidth={2.2}
        transform="translate(248 360) scale(0.42) translate(-30 -30)"
        d="M30 5 L 36.5 22.5 L 55 23.5 L 40.5 35.5 L 46 55 L 30 44 L 13.5 55.5 L 19.5 35.5 L 5 23 L 23.5 22 Z"
      />
      {/* Coffee */}
      <g id="mug">
        <path
          {...paper}
          d="M316 392 L 318 432 C 318 437, 322 440, 327 440 L 347 440 C 352 440, 355 437, 356 432 L 358 392 Z"
        />
        <path {...line} d="M357 402 C 371 400, 373 424, 356 425" />
        <path fill="var(--brand)" d="M317.6 404 L 357.4 404 L 357 414 L 318 414 Z" />
        <path {...fine} d="M317.6 404 L 357.4 404 M318 414 L 357 414" />
        <Steam x={328} y={384} />
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

export function WaveUpperArm() {
  return (
    <>
      <path {...line} d="M104 322 C 110 362, 114 404, 112 440" />
      <path {...paper} d="M280 300 C 300 288, 322 274, 334 250 L 362 262 C 350 294, 328 322, 300 342 Z" />
    </>
  );
}

/** Forearm + open hand; rotated around the elbow to wave. */
export function WaveForearm() {
  return (
    <>
      <path {...paper} d="M334 258 C 336 232, 338 212, 337 194 L 363 194 C 365 212, 365 236, 362 264 Z" />
      <path {...fine} d="M337 202 C 346 205, 355 205, 363 202" />
      {/* Thumb */}
      <path
        {...paper}
        d="M336 182 C 326 180, 318 170, 321 162 C 324 156, 331 158, 335 165 C 337 170, 338 176, 338 180 Z"
      />
      {/* Open palm with spread fingers */}
      <path
        {...paper}
        d="M336 196 C 333 184, 332 172, 333 160 C 332 148, 331 138, 335 134 C 339 131, 342 136, 342 146 L 343 154 C 343 140, 343 128, 348 126 C 353 125, 354 134, 353 148 L 353 154 C 354 142, 356 130, 361 130 C 366 131, 366 140, 364 152 L 363 160 C 366 152, 369 146, 373 148 C 377 151, 373 162, 370 172 C 368 182, 366 190, 364 196 Z"
      />
    </>
  );
}

export function ThinkingArm() {
  return (
    <g id="thinking-arm">
      <path {...line} d="M298 322 C 292 362, 288 404, 290 440" />
      <path {...line} d="M104 322 C 108 350, 106 376, 100 398" />
      {/* Forearm rising to the chin */}
      <path {...paper} d="M112 440 C 128 384, 150 324, 170 264 L 198 274 C 182 334, 164 392, 150 440 Z" />
      <path {...fine} d="M171 270 C 179 274, 188 276, 196 275" />
      {/* Fist resting under the chin, index finger along the jaw */}
      <path
        {...paper}
        d="M166 262 C 158 248, 164 230, 180 226 C 194 222, 208 230, 208 244 C 208 258, 196 268, 182 268 C 175 268, 169 266, 166 262 Z"
      />
      <path
        {...paper}
        d="M190 226 C 196 220, 206 214, 214 214 C 220 214, 222 220, 216 224 C 210 228, 204 230, 200 232 Z"
      />
      <path {...fine} d="M172 240 C 180 242, 190 242, 199 239 M171 251 C 180 253, 190 253, 200 250" />
    </g>
  );
}

/** Upper-arm seams plus forearms rising from the bottom edge to the hands. */
function HoldingArms() {
  return (
    <>
      <path {...line} d="M104 322 C 108 350, 106 380, 98 404" />
      <path {...line} d="M298 322 C 294 350, 296 380, 304 404" />
      <path {...paper} d="M112 440 C 120 420, 134 400, 152 380 L 176 394 C 162 410, 152 426, 148 440 Z" />
      <path {...paper} d="M290 440 C 282 420, 268 400, 250 380 L 226 394 C 240 410, 250 426, 254 440 Z" />
      <path {...fine} d="M152 380 C 160 388, 168 392, 176 394 M250 380 C 242 388, 234 392, 226 394" />
    </>
  );
}

export function CoffeeProps() {
  return (
    <g id="coffee">
      <HoldingArms />
      <path
        {...paper}
        d="M176 312 L 179 380 C 180 387, 185 391, 192 391 L 211 391 C 218 391, 223 387, 224 380 L 227 312 Z"
      />
      <path fill="var(--brand)" d="M177.2 334 L 225.8 334 L 225.1 350 L 177.9 350 Z" />
      <path {...fine} d="M177.2 334 L 225.8 334 M177.9 350 L 225.1 350" />
      <Steam x={194} y={300} />
      <Mitten x={170} y={366} rotate={-8} />
      <Mitten x={232} y={366} rotate={8} flip />
    </g>
  );
}

export function EnvelopeProps() {
  return (
    <g id="envelope">
      <HoldingArms />
      <g transform="rotate(-6 201 352)">
        <path {...paper} d="M144 316 L 258 316 L 258 388 L 144 388 Z" />
        <path {...line} d="M144 316 L 201 356 L 258 316" />
        <path
          fill="var(--brand)"
          stroke="var(--peep-line)"
          strokeWidth={2.2}
          transform="translate(201 358) scale(0.36) translate(-30 -30)"
          d="M30 52 C 10 38, 2 24, 12 14 C 20 6, 28 12, 30 19 C 32 12, 40 6, 48 14 C 58 24, 50 38, 30 52 Z"
        />
      </g>
      <Mitten x={150} y={378} rotate={-14} />
      <Mitten x={252} y={372} rotate={10} flip />
    </g>
  );
}

export function SignProps({ text }: { text: string }) {
  return (
    <g id="sign">
      <path {...paper} d="M78 440 C 84 412, 92 384, 98 352 L 124 358 C 118 388, 114 414, 112 440 Z" />
      <path {...paper} d="M324 440 C 318 412, 310 384, 304 352 L 278 358 C 284 388, 288 414, 290 440 Z" />
      <path {...paper} d="M84 236 L 318 228 L 322 352 L 90 358 Z" />
      <text
        x="203"
        y="306"
        textAnchor="middle"
        fontFamily="var(--font-caveat), var(--font-noto-sans-sc), cursive"
        fontSize="58"
        fill="var(--peep-line)"
        transform="rotate(-2 203 300)"
      >
        {text}
      </text>
      <path
        fill="none"
        stroke="var(--brand)"
        strokeWidth={5}
        strokeLinecap="round"
        d="M120 326 C 170 318, 240 316, 288 322"
      />
      <Mitten x={104} y={344} rotate={-10} />
      <Mitten x={300} y={340} rotate={10} flip />
    </g>
  );
}

export function MapProps() {
  return (
    <g id="map">
      <path {...paper} d="M80 440 C 86 418, 92 396, 98 374 L 124 380 C 118 402, 114 422, 112 440 Z" />
      <path {...paper} d="M322 440 C 316 418, 310 396, 304 374 L 278 380 C 284 402, 288 422, 290 440 Z" />
      <path {...paper} d="M94 300 L 308 294 L 312 394 L 98 400 Z" />
      <path {...fine} stroke="var(--peep-shade)" d="M165 298 L 167 398 M236 296 L 239 396" />
      <path {...fine} strokeDasharray="7 7" d="M120 378 C 150 340, 186 386, 222 342 S 270 352, 284 330" />
      <path stroke="var(--brand)" strokeWidth={4.5} strokeLinecap="round" d="M278 318 L 294 334 M294 318 L 278 334" />
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
      <Mitten x={104} y={364} rotate={-12} />
      <Mitten x={300} y={360} rotate={12} flip />
    </g>
  );
}
