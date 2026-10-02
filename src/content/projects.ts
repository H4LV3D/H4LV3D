/**
 * Language-neutral project data. All prose (title, tagline, case study text)
 * lives in messages/<locale>.json under `Projects.<slug>`.
 *
 * TODO(content): confirm years and stacks (Coinsave/Cabify stacks are a best
 * guess from the old README), add screenshots under public/work/<slug>/ and
 * replace the dead *.cyclic.app links (Cyclic shut down in 2024).
 */
export type ProjectCategory = "web" | "mobile" | "fullstack";

export type ProjectMetric = {
  /** Message key under Projects.metrics */
  label: "users" | "engagement" | "rating";
  value: number;
  /** Rendered after the number, e.g. "+", "%", "★" */
  suffix?: string;
  decimals?: number;
};

export type Project = {
  slug: "coinsave" | "cabify" | "genz-blog" | "reciept";
  index: string;
  categories: ProjectCategory[];
  stack: string[];
  year?: number;
  status: "live" | "in-development" | "offline";
  links: { live?: string; code?: string };
  metrics: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "coinsave",
    index: "01",
    categories: ["fullstack", "web"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    status: "offline",
    links: {},
    metrics: [
      { label: "users", value: 500, suffix: "+" },
      { label: "engagement", value: 70, suffix: "%" },
      { label: "rating", value: 4.5, suffix: "★", decimals: 1 },
    ],
  },
  {
    slug: "cabify",
    index: "02",
    categories: ["web", "mobile"],
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    status: "offline",
    links: {},
    metrics: [
      { label: "users", value: 500, suffix: "+" },
      { label: "engagement", value: 70, suffix: "%" },
      { label: "rating", value: 4.5, suffix: "★", decimals: 1 },
    ],
  },
  {
    slug: "genz-blog",
    index: "03",
    categories: ["fullstack", "web"],
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "SQL"],
    status: "live",
    links: { live: "https://trendingstuffs.vercel.app/" },
    metrics: [{ label: "users", value: 100, suffix: "+" }],
  },
  {
    slug: "reciept",
    index: "04",
    categories: ["web"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PDF"],
    status: "in-development",
    links: {},
    metrics: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const toolkit = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Material UI", "Bootstrap"],
  backend: ["Node.js", "Express", "MongoDB", "MySQL", "REST APIs", "GraphQL"],
  mobile: ["React Native", "Expo"],
  tooling: ["Git", "Vercel", "Figma", "Jest", "Playwright"],
} as const;

export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "MySQL",
  "Redux",
  "React Native",
  "GraphQL",
];
