/*
 * Hand-drawn doodle library. Each doodle is a list of strokes drawn in order,
 * so they can "draw themselves" with a pathLength animation.
 */
export type DoodleDef = {
  viewBox: string;
  strokes: string[];
  /** Default stroke width in viewBox units. */
  width?: number;
  /** Filled shapes (e.g. star) fade their fill in after the stroke. */
  fill?: boolean;
  /** Stretch to the container instead of keeping the aspect ratio. */
  stretch?: boolean;
};

const squiggle = (() => {
  let d = "M2 10";
  for (let i = 0; i < 16; i++) d += ` q 12.5 ${i % 2 ? 9 : -9} 25 0`;
  return d;
})();

export const doodles = {
  underline: {
    viewBox: "0 0 200 20",
    strokes: ["M3 13 C 40 6, 90 5, 140 9 S 190 14, 197 8"],
    width: 4,
    stretch: true,
  },
  "double-underline": {
    viewBox: "0 0 200 24",
    strokes: ["M4 8 C 50 4, 120 4, 196 7", "M14 18 C 70 14, 130 15, 188 17"],
    width: 3.5,
    stretch: true,
  },
  circle: {
    viewBox: "0 0 300 120",
    strokes: [
      "M150 9 C 80 6, 13 25, 11 59 C 9 93, 81 113, 160 111 C 240 109, 292 88, 290 56 C 288 22, 219 6, 134 12 C 100 15, 72 22, 52 31",
    ],
    width: 3.5,
    stretch: true,
  },
  highlight: {
    viewBox: "0 0 200 40",
    strokes: ["M6 24 C 50 20, 120 19, 194 22"],
    width: 22,
    stretch: true,
  },
  "arrow-curvy": {
    viewBox: "0 0 120 80",
    strokes: ["M8 72 C 18 34, 58 12, 106 19", "M91 7 C 97 11, 104 15, 109 20 C 104 26, 99 30, 94 35"],
    width: 3,
  },
  "arrow-loop": {
    viewBox: "0 0 140 90",
    strokes: [
      "M8 82 C 30 72, 40 42, 60 41 C 80 40, 81 66, 63 65 C 45 64, 50 26, 85 19 C 100 16, 115 19, 128 27",
      "M113 12 C 119 17, 125 22, 130 27 C 124 31, 117 34, 111 37",
    ],
    width: 3,
  },
  "arrow-down": {
    viewBox: "0 0 40 120",
    strokes: ["M20 6 C 16 40, 26 70, 19 110", "M8 94 C 12 100, 15 106, 19 112 C 23 106, 27 101, 32 96"],
    width: 3,
  },
  star: {
    viewBox: "0 0 60 60",
    strokes: ["M30 5 L 36.5 22.5 L 55 23.5 L 40.5 35.5 L 46 55 L 30 44 L 13.5 55.5 L 19.5 35.5 L 5 23 L 23.5 22 Z"],
    width: 2.5,
    fill: true,
  },
  sparkle: {
    viewBox: "0 0 40 40",
    strokes: ["M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z"],
    width: 2,
    fill: true,
  },
  burst: {
    viewBox: "0 0 60 60",
    strokes: ["M30 6 L 31 20", "M50 14 L 41 25", "M56 36 L 43 35", "M10 14 L 19 25", "M4 36 L 17 35"],
    width: 3,
  },
  squiggle: {
    viewBox: "0 0 404 20",
    strokes: [squiggle],
    width: 2.5,
    stretch: true,
  },
  heart: {
    viewBox: "0 0 60 60",
    strokes: ["M30 52 C 10 38, 2 24, 12 14 C 20 6, 28 12, 30 19 C 32 12, 40 6, 48 14 C 58 24, 50 38, 30 52 Z"],
    width: 2.5,
    fill: true,
  },
  check: {
    viewBox: "0 0 24 24",
    strokes: ["M4.2 12.8 C 6.1 14.4, 7.8 16.4, 9.6 18.8 C 12.2 13.2, 16 8.4, 20.2 4.2"],
    width: 2,
  },
  "cross-out": {
    viewBox: "0 0 200 40",
    strokes: ["M4 30 C 60 18, 130 12, 196 8", "M8 10 C 70 16, 140 24, 192 33"],
    width: 3,
    stretch: true,
  },
  bracket: {
    viewBox: "0 0 30 120",
    strokes: ["M24 4 C 10 6, 12 50, 6 60 C 12 70, 10 114, 24 116"],
    width: 3,
  },
} satisfies Record<string, DoodleDef>;

export type DoodleName = keyof typeof doodles;
