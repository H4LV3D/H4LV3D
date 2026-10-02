/** Motion tokens — mirrored as CSS variables in globals.css. */
export const dur = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  xslow: 1,
} as const;

export const ease = {
  /** Expo-out: entrances. */
  out: [0.16, 1, 0.3, 1],
  /** Quart in-out: curtains and the preloader exit. */
  inOut: [0.76, 0, 0.24, 1],
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  soft: { type: "spring", stiffness: 120, damping: 20 },
} as const;

export const stagger = 0.06;
