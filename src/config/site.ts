export const site = {
  name: "Toluwalope Akinkunmi",
  shortName: "Tolu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toluwalope.tech",
  email: "akinkunmitolulope23@gmail.com",
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
  portrait: undefined as string | undefined,
  /** Numbers for the About page. */
  stats: { projects: 15, companies: 6, clients: 12, pages: 60 },
  /** Shown as a pulsing badge on the contact page and footer. */
  availableForWork: true,
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
