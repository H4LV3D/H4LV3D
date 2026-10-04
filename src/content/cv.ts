/**
 * CV content (English), served at cv.<domain> and /cv. Dates come from the
 * company data in ./projects so the CV and the site never disagree.
 *
 * Keep it to two A4 pages: after editing, open /cv and check nothing is cut
 * off at the bottom of a page (the e2e test fails if it is), then regenerate
 * the PDF with `pnpm cv:pdf`.
 */
import type { CompanyId } from "./projects";

export type CvRole = {
  company: CompanyId;
  name: string;
  role: string;
  url?: string;
  bullets: string[];
};

export const cv = {
  headline: "Senior Frontend Engineer · Systems Design & AI",
  summary:
    "Senior frontend engineer with three years of shipping web and mobile products end to end, and more and more of the systems underneath them: single sign-on for a product family, a web and mobile monorepo with shared business logic, a published design system, and real-time audio and video. Now moving into systems design and AI, building products where an LLM does real work.",

  pages: [
    [
      {
        company: "circular-net",
        name: "The Circular Net",
        role: "Frontend Engineer, web & mobile",
        url: "thecircularnet.com",
        bullets: [
          "Lead frontend engineer across a sustainability platform's product family: the social web app, the iOS and Android app, Circular Ticket on web and mobile, single sign-on, the admin dashboard and the marketing site.",
          "Rebuilt the social web app on the Next.js App Router with a module per product area, real-time chat and live audio and video rooms (Stream, Pusher); more than 2,000 commits across two versions.",
          "Built the Expo / React Native app, live on the App Store and Google Play, with live rooms, background podcast playback, deep links, push notifications and separate dev, staging and production builds.",
          "Designed an npm-workspaces monorepo for Circular Ticket so the Next.js and Expo apps share API services, query hooks, validation and business rules: payout and currency rules exist once.",
          "Built the OAuth 2.0 single sign-on every product trusts (strict client and redirect validation, Google and Apple sign-in) and published a shared React component library to npm.",
        ],
      },
      {
        company: "smarkt",
        name: "Smarkt",
        role: "Frontend Engineer",
        url: "smarkt.tech",
        bullets: ["Frontend engineering across Smarkt's four core products."],
      },
      {
        company: "gemspay",
        name: "GemsPay Solutions",
        role: "Frontend Engineer",
        url: "gemspaysolution.com",
        bullets: [
          "Frontend engineering across most of a centralised payments platform covering bulk payments, collections and reconciliation.",
        ],
      },
      {
        company: "hotrac",
        name: "Hotrac",
        role: "Frontend Engineer",
        bullets: [
          "Led the frontend of Export Trades, a cross-border commodity trading platform with quotes, offers, escrow and disputes, multilingual from day one including right-to-left Arabic; largest contributor on a five-person team.",
          "Built Farmshare's admin dashboard for tractor sharing: users, bookings, transactions, payment requests and maps.",
        ],
      },
    ],
    [
      {
        company: "lawxtech",
        name: "Law x Tech",
        role: "Web Developer, volunteer",
        url: "lawxtech.org",
        bullets: [
          "Built the community's original site, then a 2026 redesign on Next.js 16 with an admin CMS (Auth.js, Postgres, Vercel Blob, rich-text editor, role-based users) that the team runs themselves.",
        ],
      },
      {
        company: "freelance",
        name: "Freelance",
        role: "Frontend & Mobile Engineer",
        bullets: [
          "Invocipt: invoicing SaaS with multi-business workspaces, public QR payment pages (Paystack, Flutterwave), one-click receipts, and email and web push notifications.",
          "Architekt: agency site with an AI pricing questionnaire; Gemini via Genkit returns a schema-validated plan, add-ons and estimate that are emailed as a lead.",
          "Pennywise: Expo personal-finance app and two versions of its website. Life Fount: four-language (English, Yoruba, Igbo, Hausa) medical centre site.",
          "DS Energy: sales and commissions portal with PDF invoices. Royal Revamps: branding agency site with a database-backed blog and contact.",
        ],
      },
    ],
  ] as CvRole[][],

  projects: [
    {
      name: "Stock Bot",
      detail:
        "A scheduled AI agent on AWS Lambda: scrapes the day's biggest losers on the Nigerian Exchange, confirms real dips against five days of history in DynamoDB, asks Gemini for a short analysis and sends the top picks to Telegram. Deployed with GitHub Actions.",
    },
  ],

  skills: [
    {
      label: "Frontend",
      items:
        "React, Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query, Redux Toolkit, React Hook Form, Zod, Motion, next-intl",
    },
    {
      label: "Mobile",
      items: "React Native, Expo, Expo Router, NativeWind, Reanimated, EAS Build & Updates, push notifications",
    },
    {
      label: "Systems",
      items:
        "Monorepos, design systems, OAuth 2.0 / SSO, real-time (Stream, Pusher), shared validation, i18n & RTL, CI/CD",
    },
    {
      label: "Back-end & cloud",
      items: "Node.js, Express, Auth.js, PostgreSQL, Prisma, MongoDB, AWS Lambda, DynamoDB, Vercel",
    },
    {
      label: "AI",
      items: "LLM APIs (Gemini, Claude), structured output, prompt design, scheduled agents, AI-assisted engineering",
    },
  ],
};
