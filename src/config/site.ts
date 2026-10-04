export const site = {
  name: "Toluwalope Akinkunmi",
  shortName: "Tolu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.toluwalopeakinkunmi.dev",
  email: "akinkunmitolulope23@gmail.com",
  /** The printable CV (served by app/cv on the cv. subdomain). */
  cvUrl: process.env.NEXT_PUBLIC_CV_URL ?? "https://cv.toluwalopeakinkunmi.dev",
  // Add LinkedIn, X, Dribbble… here — they appear in the footer, contact page
  // and command palette automatically.
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/H4LV3D" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/toluwalope-akinkunmi-a23b02167/",
    },
    { id: "x", label: "X / Twitter", href: "https://x.com/kinkunmz_" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/__moyin_" },
    { id: "telegram", label: "Telegram", href: "https://t.me/H4LV3D" },
  ],
  /**
   * Portrait for the About page ("the real me"). Drop a photo at
   * public/images/me/portrait.jpg and set this to "/images/me/portrait.jpg".
   */
  portrait: "/images/me/portrait.jpg" as string | undefined,
  /** Black-and-white studio headshot for the home hero. */
  headshot: "/images/me/headshot-bw.jpg",
  /**
   * Illustrated portrait shown in front of the photo on the About page
   * (e.g. a Ghibli-style painting). Drop it in public/images/me/ and set the
   * path; until then an Open Peep stands in.
   */
  portraitIllustration: undefined as string | undefined,
  /** Numbers for the About page (labels in About.stats). */
  stats: [
    { key: "years", value: 3, suffix: "+" },
    { key: "products", value: 20, suffix: "+" },
    { key: "companies", value: 8, suffix: "" },
    { key: "commits", value: 3500, suffix: "+" },
  ],
  /** Shown as a pulsing badge on the contact page and footer. */
  availableForWork: true,
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
