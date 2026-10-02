/**
 * The ONE place to change the site's accent colour.
 *
 * Everything else reads from here: the `--brand` CSS variable (and every
 * Tailwind `brand` utility derived from it), Open Graph images, the browser
 * theme colour and the illustrations.
 */
export const brand = {
  /** Signal Orange. */
  accent: "#FF5B1F",
  /** Text/icon colour used on top of the accent. */
  accentForeground: "#171717",
} as const;

/** Inline style for <html> so CSS can read the brand colour. */
export const brandCssVariables = {
  "--brand": brand.accent,
  "--brand-foreground": brand.accentForeground,
} as React.CSSProperties;
