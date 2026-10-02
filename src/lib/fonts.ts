import {
  Caveat,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Noto_Sans_SC,
  Noto_Serif_SC,
  Playfair_Display,
} from "next/font/google";

/*
 * Latin fonts are preloaded. The Cyrillic/CJK fallbacks are not: the browser
 * only downloads them (thanks to unicode-range) when a Russian or Chinese
 * glyph actually appears on screen.
 */
export const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
  display: "swap",
});

/** Cyrillic display fallback — Instrument Serif has no Cyrillic. */
export const playfair = Playfair_Display({
  subsets: ["cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

export const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  geist.variable,
  geistMono.variable,
  instrumentSerif.variable,
  caveat.variable,
  playfair.variable,
  notoSansSC.variable,
  notoSerifSC.variable,
].join(" ");
