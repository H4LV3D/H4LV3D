/**
 * Notes: short system-design write-ups. Metadata lives here; the text for
 * each language is in ./<locale>.ts (TypeScript makes sure every language has
 * every note).
 */
import type { Locale } from "@/i18n/routing";
import type { CaseStudy } from "../projects";
import type { NoteContent, NoteSlug, NoteTranslations } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { ru } from "./ru";
import { zh } from "./zh";

export type { NoteBlock, NoteContent, NoteSlug } from "./types";

export type Note = {
  slug: NoteSlug;
  /** ISO date */
  date: string;
  /** Case study this note comes from. */
  related?: CaseStudy["slug"];
};

/** Newest first. */
export const notes: Note[] = [
  { slug: "filter-before-you-think", date: "2026-10-02", related: "stock-bot" },
  { slug: "share-logic-not-screens", date: "2026-10-02", related: "circular-ticket" },
  { slug: "one-sign-in-many-apps", date: "2026-10-02", related: "circular-net-sso" },
];

const content: Record<Locale, NoteTranslations> = { en, fr, es, ru, zh };

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

export function getNoteContent(slug: NoteSlug, locale: Locale): NoteContent {
  return content[locale][slug];
}

export function getNextNote(slug: NoteSlug) {
  const i = notes.findIndex((n) => n.slug === slug);
  return notes[(i + 1) % notes.length];
}

/** Rough reading time: words for alphabetic scripts, characters for Chinese. */
export function readingMinutes(note: NoteContent, locale: Locale) {
  const text = note.blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "diagram" ? b.caption : b.text))
    .join(" ");
  const units = locale === "zh" ? text.replace(/\s/g, "").length / 400 : text.split(/\s+/).length / 200;
  return Math.max(1, Math.ceil(units));
}
