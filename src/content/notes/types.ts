import type { DiagramId } from "../diagrams";

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  /** A pull quote, set large. */
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "diagram"; id: DiagramId; caption: string };

export type NoteSlug =
  "the-cost-of-simplicity" | "one-sign-in-many-apps" | "share-logic-not-screens" | "filter-before-you-think";

export type NoteContent = { title: string; summary: string; blocks: NoteBlock[] };

export type NoteTranslations = Record<NoteSlug, NoteContent>;
