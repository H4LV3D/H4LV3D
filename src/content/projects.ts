/**
 * Language-neutral work data. All prose (titles, taglines, case study text)
 * lives in messages/<locale>.json under `Companies.<id>` and `Projects.<slug>`.
 *
 * The Work section never links to source code. Only live sites, store
 * listings and packages are linked.
 */
import type { DiagramDef } from "./diagrams";
import { diagrams } from "./diagrams";

export type ProjectCategory = "web" | "mobile" | "systems" | "ai";

/** "YYYY-MM" */
export type Month = `${number}-${number}`;
export type Period = { start: Month; end?: Month };

export type CompanyId = "circular-net" | "smarkt" | "gemspay" | "hotrac" | "lawxtech" | "freelance" | "lab";

export type Company = {
  id: CompanyId;
  url?: string;
  period: Period;
  /** Shown on the About timeline. The "lab" group is personal work, so it is left off. */
  timeline: boolean;
};

export const companies: Company[] = [
  { id: "circular-net", url: "https://www.thecircularnet.com", period: { start: "2023-12" }, timeline: true },
  { id: "smarkt", url: "https://smarkt.tech", period: { start: "2025-12", end: "2026-08" }, timeline: true },
  { id: "gemspay", url: "https://gemspaysolution.com", period: { start: "2024-03" }, timeline: true },
  { id: "hotrac", period: { start: "2023-10", end: "2026-04" }, timeline: true },
  { id: "lawxtech", url: "https://lawxtech.org", period: { start: "2023-09" }, timeline: true },
  { id: "freelance", period: { start: "2024-01", end: "2026-07" }, timeline: true },
  { id: "lab", period: { start: "2023-07" }, timeline: false },
];

export type ProjectMetric = {
  /** Message key under Projects.metrics */
  label: "users" | "engagement" | "rating" | "commits" | "apps";
  value: number;
  /** Rendered after the number, e.g. "+", "%", "★" */
  suffix?: string;
  decimals?: number;
};

export type ProjectLinks = {
  live?: string;
  appStore?: string;
  playStore?: string;
  npm?: string;
};

type ProjectBase = {
  company: CompanyId;
  categories: ProjectCategory[];
  stack: string[];
  /** Omitted where the dates aren't known from the repositories. */
  period?: Period;
  status: "live" | "in-development" | "offline" | "internal";
  links: ProjectLinks;
  /** Kept in the data but not shown anywhere on the site. */
  hidden?: boolean;
};

/** Full case study with its own page. */
export type CaseStudy = ProjectBase & {
  slug:
    | "the-circular-net-web"
    | "the-circular-net-mobile"
    | "circular-ticket"
    | "circular-ticket-mobile"
    | "circular-net-sso"
    | "circular-net-website"
    | "export-trades"
    | "lawxtech"
    | "pennywise"
    | "stock-bot"
    | "trendhub"
    | "coinsave"
    | "cabify";
  tier: "case-study";
  metrics: ProjectMetric[];
  /** Number of "What I built" bullets in Projects.<slug>.built (a, b, c…). */
  built: number;
  /** Number of design decisions in Projects.<slug>.decisions (a, b, c…). */
  decisions: number;
  system?: DiagramDef;
};

/** One-line entry in a company group, no page of its own. */
export type ArchiveItem = ProjectBase & {
  slug: "circular-net-admin" | "thebasenet-ui" | "circular-net-waitlist" | "farmshare" | "ds-energy" | "royal-revamps";
  tier: "archive";
};

export type Project = CaseStudy | ArchiveItem;

const allProjects: Project[] = [
  // The Circular Net ---------------------------------------------------------
  {
    slug: "circular-net-website",
    tier: "case-study",
    company: "circular-net",
    categories: ["web"],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Motion", "Lenis"],
    period: { start: "2026-06" },
    status: "live",
    links: { live: "https://www.thecircularnet.com" },
    metrics: [],
    built: 5,
    decisions: 2,
  },
  {
    slug: "the-circular-net-web",
    tier: "case-study",
    company: "circular-net",
    categories: ["web", "systems"],
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "Redux Toolkit",
      "Stream",
      "Pusher",
      "TipTap",
      "Tailwind CSS",
    ],
    period: { start: "2023-12" },
    status: "live",
    links: { live: "https://app.thecircularnet.com" },
    metrics: [
      { label: "commits", value: 2000, suffix: "+" },
      { label: "apps", value: 7 },
    ],
    built: 6,
    decisions: 3,
    system: diagrams.circularNetPlatform,
  },
  {
    slug: "the-circular-net-mobile",
    tier: "case-study",
    company: "circular-net",
    categories: ["mobile", "systems"],
    stack: [
      "Expo",
      "React Native",
      "Expo Router",
      "TypeScript",
      "NativeWind",
      "TanStack Query",
      "Stream",
      "Pusher",
      "EAS",
    ],
    period: { start: "2025-07" },
    status: "live",
    links: {
      appStore: "https://apps.apple.com/app/the-circular-net/id6747455234",
      playStore: "https://play.google.com/store/apps/details?id=com.thecircularnet.mobile",
    },
    metrics: [],
    built: 6,
    decisions: 3,
    system: diagrams.circularNetMobile,
  },
  {
    slug: "circular-ticket",
    tier: "case-study",
    company: "circular-net",
    categories: ["web", "systems"],
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "npm workspaces",
      "TanStack Query",
      "TanStack Table",
      "Redux Toolkit",
      "Zod",
      "Stripe",
    ],
    period: { start: "2026-03" },
    status: "live",
    links: { live: "https://circularticket.com" },
    metrics: [],
    built: 6,
    decisions: 3,
    system: diagrams.circularTicket,
  },
  {
    slug: "circular-ticket-mobile",
    tier: "case-study",
    company: "circular-net",
    categories: ["mobile", "systems"],
    stack: [
      "Expo",
      "React Native",
      "Expo Router",
      "TypeScript",
      "NativeWind",
      "TanStack Query",
      "Redux Toolkit",
      "Zod",
      "Reanimated",
      "expo-camera",
      "EAS",
    ],
    period: { start: "2026-07" },
    status: "in-development",
    links: {},
    metrics: [],
    built: 6,
    decisions: 3,
    system: diagrams.circularTicketMobile,
  },
  {
    slug: "circular-net-sso",
    tier: "case-study",
    hidden: true,
    company: "circular-net",
    categories: ["web", "systems"],
    stack: [
      "Next.js 16",
      "React 19",
      "React Compiler",
      "TypeScript",
      "OAuth 2.0",
      "Google Sign-In",
      "Sign in with Apple",
      "Motion",
    ],
    period: { start: "2025-12", end: "2026-07" },
    status: "live",
    links: { live: "https://accounts.thecircularnet.com" },
    metrics: [],
    built: 5,
    decisions: 3,
    system: diagrams.sso,
  },
  {
    slug: "circular-net-admin",
    tier: "archive",
    hidden: true,
    company: "circular-net",
    categories: ["web"],
    stack: ["Next.js", "Mantine", "TanStack Table", "Docker"],
    period: { start: "2024-06" },
    status: "internal",
    links: {},
  },
  {
    slug: "thebasenet-ui",
    tier: "archive",
    hidden: true,
    company: "circular-net",
    categories: ["web", "systems"],
    stack: ["React", "Radix UI", "Tailwind CSS", "tsup"],
    status: "live",
    links: { npm: "https://www.npmjs.com/package/@thebasenet/ui" },
  },
  {
    slug: "circular-net-waitlist",
    tier: "archive",
    hidden: true,
    company: "circular-net",
    categories: ["web"],
    stack: ["Next.js", "Radix UI", "Motion"],
    period: { start: "2025-08", end: "2025-09" },
    status: "offline",
    links: {},
  },

  // Hotrac -------------------------------------------------------------------
  {
    slug: "export-trades",
    tier: "case-study",
    company: "hotrac",
    categories: ["web", "systems"],
    stack: ["Next.js", "TypeScript", "next-intl", "TanStack Query", "TanStack Table", "Redux Toolkit", "Zod", "AWS S3"],
    period: { start: "2025-08", end: "2026-04" },
    status: "live",
    links: { live: "https://www.exportrades.com" },
    metrics: [],
    built: 5,
    decisions: 3,
    system: diagrams.exportTrades,
  },
  {
    slug: "farmshare",
    tier: "archive",
    company: "hotrac",
    categories: ["web"],
    stack: ["Next.js", "Mantine", "Redux Toolkit", "Google Maps", "Chart.js"],
    period: { start: "2023-10", end: "2023-11" },
    status: "offline",
    links: {},
  },

  // Law x Tech ---------------------------------------------------------------
  {
    slug: "lawxtech",
    tier: "case-study",
    company: "lawxtech",
    categories: ["web", "systems"],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Auth.js",
      "Neon Postgres",
      "Vercel Blob",
      "TipTap",
      "Tailwind CSS",
    ],
    period: { start: "2023-09" },
    status: "live",
    links: { live: "https://lawxtech.org" },
    metrics: [],
    built: 5,
    decisions: 3,
    system: diagrams.lawxtech,
  },

  // Freelance clients --------------------------------------------------------
  {
    slug: "pennywise",
    tier: "case-study",
    company: "freelance",
    categories: ["mobile", "web"],
    stack: ["Expo", "React Native", "Expo Router", "NativeWind", "Redux Toolkit", "MMKV", "Skia", "Next.js"],
    period: { start: "2024-01", end: "2025-05" },
    status: "live",
    links: { live: "https://www.iampennywise.com" },
    metrics: [],
    built: 5,
    decisions: 2,
  },
  {
    slug: "ds-energy",
    tier: "archive",
    company: "freelance",
    categories: ["web"],
    stack: ["Next.js", "TanStack Table", "Redux Toolkit", "jsPDF"],
    period: { start: "2025-08", end: "2025-11" },
    status: "internal",
    links: {},
  },
  {
    slug: "royal-revamps",
    tier: "archive",
    company: "freelance",
    categories: ["web"],
    stack: ["Next.js", "Prisma", "TypeScript"],
    period: { start: "2026-07" },
    status: "live",
    links: { live: "https://royal-revamps.com.ng" },
  },

  // Lab (personal) -----------------------------------------------------------
  {
    slug: "stock-bot",
    tier: "case-study",
    company: "lab",
    categories: ["ai", "systems"],
    stack: ["Python", "AWS Lambda", "EventBridge", "DynamoDB", "Gemini API", "Telegram Bot API", "GitHub Actions"],
    period: { start: "2026-02" },
    status: "in-development",
    links: {},
    metrics: [],
    built: 5,
    decisions: 3,
    system: diagrams.stockBot,
  },
  {
    slug: "trendhub",
    tier: "case-study",
    company: "lab",
    categories: ["web"],
    stack: ["Next.js 13", "TypeScript", "Redux Toolkit", "Framer Motion", "Tailwind CSS"],
    status: "live",
    links: { live: "https://trendingstuffs.vercel.app/" },
    metrics: [{ label: "users", value: 100, suffix: "+" }],
    built: 0,
    decisions: 0,
  },
  {
    slug: "coinsave",
    tier: "case-study",
    company: "lab",
    categories: ["web"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    status: "offline",
    links: {},
    metrics: [
      { label: "users", value: 500, suffix: "+" },
      { label: "engagement", value: 70, suffix: "%" },
      { label: "rating", value: 4.5, suffix: "★", decimals: 1 },
    ],
    built: 0,
    decisions: 0,
  },
  {
    slug: "cabify",
    tier: "case-study",
    company: "lab",
    categories: ["web"],
    stack: ["React", "Bootstrap", "Axios"],
    status: "offline",
    links: {},
    metrics: [
      { label: "users", value: 500, suffix: "+" },
      { label: "engagement", value: 70, suffix: "%" },
      { label: "rating", value: 4.5, suffix: "★", decimals: 1 },
    ],
    built: 0,
    decisions: 0,
  },
];

/** Everything shown on the site, in display order. */
export const projects = allProjects.filter((p) => !p.hidden);

export const caseStudies = projects.filter((p): p is CaseStudy => p.tier === "case-study");

/** Two-digit running number for a case study ("01", "02"…). */
export function caseIndex(slug: CaseStudy["slug"]) {
  return String(caseStudies.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

export function getCompany(id: CompanyId) {
  return companies.find((c) => c.id === id)!;
}

/** Companies in display order, each with its projects (case studies first). */
export function groupedWork(list: Project[] = projects) {
  return companies
    .map((company) => ({
      company,
      items: list
        .filter((p) => p.company === company.id)
        .sort((a, b) => (a.tier === b.tier ? 0 : a.tier === "case-study" ? -1 : 1)),
    }))
    .filter((g) => g.items.length > 0);
}

/** The case studies featured on the home page. */
export const featured: CaseStudy["slug"][] = [
  "the-circular-net-web",
  "the-circular-net-mobile",
  "circular-ticket",
  "stock-bot",
];

export const toolkit = {
  frontend: [
    "React",
    "Next.js (App Router)",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Radix UI",
    "TanStack Query",
    "TanStack Table",
    "Redux Toolkit",
    "React Hook Form",
    "Zod",
    "Motion",
    "next-intl",
  ],
  mobile: [
    "React Native",
    "Expo",
    "Expo Router",
    "NativeWind",
    "Reanimated",
    "EAS Build & Updates",
    "Push notifications",
  ],
  systems: [
    "Monorepos (npm workspaces)",
    "Design systems",
    "OAuth 2.0 / SSO",
    "Real-time (Stream, Pusher)",
    "Shared validation",
    "i18n & RTL",
    "Docker",
    "CI/CD",
  ],
  backend: [
    "Node.js",
    "Express",
    "Auth.js",
    "Postgres (Neon)",
    "Prisma",
    "MongoDB",
    "AWS Lambda",
    "DynamoDB",
    "Vercel Blob",
    "S3",
  ],
  ai: ["LLM APIs (Gemini, Claude)", "Prompt design", "Scheduled agents", "AI-assisted engineering"],
} as const;

export const marquee = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Expo",
  "System design",
  "Monorepos",
  "OAuth 2.0",
  "Design systems",
  "Real-time",
  "AWS Lambda",
  "LLMs",
];
