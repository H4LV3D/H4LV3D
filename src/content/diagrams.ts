/**
 * System diagrams for case studies and notes, drawn by
 * components/illustrations/system-diagram.tsx.
 *
 * Coordinates are node centres in a viewBox `width` × `height`. `label` and
 * edge labels are keys under the `Diagram` messages namespace; `sub` is a
 * technology name and is never translated.
 */
import type messages from "../../messages/en.json";

export type DiagramLabel = keyof (typeof messages)["Diagram"]["nodes"];
export type DiagramEdgeLabel = keyof (typeof messages)["Diagram"]["edges"];

export type DiagramNode = {
  id: string;
  label: DiagramLabel;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  /** "actor" = people (pill), "accent" = the part this story is about. */
  kind?: "actor" | "accent";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: DiagramEdgeLabel;
  /** Arrow heads at both ends. */
  both?: boolean;
  dashed?: boolean;
};

export type DiagramDef = {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

const d = <T extends DiagramDef>(def: T) => def;

export const diagrams = {
  circularNetPlatform: d({
    width: 800,
    height: 410,
    nodes: [
      { id: "people", label: "community", x: 400, y: 50, kind: "actor" },
      { id: "web", label: "webApp", sub: "Next.js", x: 150, y: 190, kind: "accent" },
      { id: "api", label: "platformApi", sub: "REST", x: 400, y: 190 },
      { id: "mobile", label: "mobileApp", sub: "Expo", x: 650, y: 190 },
      { id: "sso", label: "sso", sub: "OAuth 2.0", x: 150, y: 345 },
      { id: "rt", label: "realtime", sub: "Stream · Pusher", x: 400, y: 345 },
      { id: "push", label: "push", sub: "Notifee", x: 650, y: 345 },
    ],
    edges: [
      { from: "people", to: "web" },
      { from: "people", to: "mobile" },
      { from: "web", to: "api", both: true },
      { from: "mobile", to: "api", both: true },
      { from: "web", to: "sso", label: "signIn" },
      { from: "web", to: "rt", label: "roomsChat" },
      { from: "mobile", to: "rt" },
      { from: "mobile", to: "push" },
    ],
  }),

  circularNetMobile: d({
    width: 800,
    height: 410,
    nodes: [
      { id: "app", label: "mobileApp", sub: "Expo Router", x: 400, y: 50, kind: "accent" },
      { id: "feed", label: "feed", x: 140, y: 190 },
      { id: "rooms", label: "rooms", sub: "Stream", x: 400, y: 190 },
      { id: "podcast", label: "podcast", sub: "track-player", x: 660, y: 190 },
      { id: "variants", label: "variants", x: 140, y: 345 },
      { id: "eas", label: "eas", sub: "EAS", x: 400, y: 345 },
      { id: "stores", label: "stores", x: 660, y: 345, kind: "actor" },
    ],
    edges: [
      { from: "app", to: "feed" },
      { from: "app", to: "rooms" },
      { from: "app", to: "podcast" },
      { from: "variants", to: "eas", label: "config" },
      { from: "eas", to: "stores", label: "ship" },
    ],
  }),

  circularTicket: d({
    width: 800,
    height: 470,
    nodes: [
      { id: "people", label: "attendeesOrganisers", x: 400, y: 50, kind: "actor" },
      { id: "web", label: "webApp", sub: "Next.js", x: 170, y: 180 },
      { id: "mobile", label: "mobileApp", sub: "Expo", x: 630, y: 180 },
      { id: "shared", label: "sharedPackage", sub: "npm workspaces", x: 400, y: 300, w: 220, kind: "accent" },
      { id: "api", label: "platformApi", sub: "REST", x: 400, y: 420 },
      { id: "pay", label: "payouts", sub: "Stripe", x: 660, y: 420 },
    ],
    edges: [
      { from: "people", to: "web" },
      { from: "people", to: "mobile" },
      { from: "web", to: "shared", label: "imports" },
      { from: "mobile", to: "shared", label: "imports" },
      { from: "shared", to: "api", label: "typedRequests" },
      { from: "api", to: "pay", both: true },
    ],
  }),

  sso: d({
    width: 800,
    height: 400,
    nodes: [
      { id: "site", label: "marketingSite", x: 140, y: 50 },
      { id: "web", label: "webApp", x: 400, y: 50 },
      { id: "ticket", label: "circularTicket", x: 660, y: 50 },
      { id: "sso", label: "sso", sub: "OAuth 2.0", x: 400, y: 200, w: 200, kind: "accent" },
      { id: "providers", label: "providers", sub: "Google · Apple", x: 140, y: 345 },
      { id: "auth", label: "authApi", x: 400, y: 345 },
      { id: "otp", label: "emailOtp", x: 660, y: 345 },
    ],
    edges: [
      { from: "site", to: "sso", both: true },
      { from: "web", to: "sso", label: "authorise", both: true },
      { from: "ticket", to: "sso", both: true },
      { from: "sso", to: "providers", label: "socialSignIn" },
      { from: "sso", to: "auth", label: "tokens", both: true },
      { from: "sso", to: "otp", label: "verify" },
    ],
  }),

  exportTrades: d({
    width: 800,
    height: 470,
    nodes: [
      { id: "people", label: "buyersSellers", x: 400, y: 50, kind: "actor" },
      { id: "site", label: "publicSite", x: 170, y: 180 },
      { id: "app", label: "tradingApp", x: 630, y: 180, kind: "accent" },
      { id: "i18n", label: "localeRouting", sub: "next-intl · RTL", x: 400, y: 300 },
      { id: "flow", label: "tradeFlow", x: 630, y: 300 },
      { id: "docs", label: "uploads", sub: "S3", x: 630, y: 420 },
    ],
    edges: [
      { from: "people", to: "site" },
      { from: "people", to: "app" },
      { from: "site", to: "i18n" },
      { from: "app", to: "i18n" },
      { from: "app", to: "flow" },
      { from: "flow", to: "docs", label: "verify" },
    ],
  }),

  lawxtech: d({
    width: 800,
    height: 400,
    nodes: [
      { id: "visitors", label: "visitors", x: 150, y: 50, kind: "actor" },
      { id: "editors", label: "editors", x: 650, y: 50, kind: "actor" },
      { id: "site", label: "publicSite", sub: "Next.js 16", x: 150, y: 195 },
      { id: "cms", label: "adminCms", sub: "Auth.js", x: 650, y: 195, kind: "accent" },
      { id: "db", label: "database", sub: "Neon Postgres", x: 400, y: 345 },
      { id: "blob", label: "images", sub: "Vercel Blob", x: 650, y: 345 },
    ],
    edges: [
      { from: "visitors", to: "site" },
      { from: "editors", to: "cms", label: "signIn" },
      { from: "site", to: "db", label: "read" },
      { from: "cms", to: "db", label: "write" },
      { from: "cms", to: "blob", label: "upload" },
    ],
  }),

  stockBot: d({
    width: 800,
    height: 300,
    nodes: [
      { id: "cron", label: "schedule", sub: "EventBridge", x: 120, y: 60 },
      { id: "lambda", label: "scanner", sub: "AWS Lambda", x: 400, y: 60, kind: "accent" },
      { id: "market", label: "marketData", sub: "NGX", x: 680, y: 60 },
      { id: "history", label: "priceHistory", sub: "DynamoDB", x: 120, y: 235 },
      { id: "llm", label: "aiAnalyst", sub: "Gemini", x: 400, y: 235 },
      { id: "report", label: "report", sub: "Telegram", x: 680, y: 235, kind: "actor" },
    ],
    edges: [
      { from: "cron", to: "lambda", label: "trigger" },
      { from: "lambda", to: "market", label: "fetch", both: true },
      { from: "lambda", to: "history", label: "check", both: true },
      { from: "lambda", to: "llm", label: "analyse", both: true },
      { from: "lambda", to: "report", label: "send" },
    ],
  }),
} satisfies Record<string, DiagramDef>;

export type DiagramId = keyof typeof diagrams;
