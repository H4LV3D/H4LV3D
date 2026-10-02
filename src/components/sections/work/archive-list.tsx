"use client";

import { useTranslations } from "next-intl";

import type { ArchiveItem } from "@/content/projects";
import { ArrowUpRight } from "@/components/illustrations/doodle-icons";
import { Badge } from "@/components/ui/badge";

/** Compact rows for work that has no case study page. */
export function ArchiveList({ items }: { items: ArchiveItem[] }) {
  const t = useTranslations("Projects");
  const work = useTranslations("Work");
  return (
    <ul>
      {items.map((p) => {
        const href = p.links.live ?? p.links.npm;
        const body = (
          <>
            <span className="flex flex-col gap-1">
              <span className="font-display text-2xl leading-tight md:text-3xl">{t(`${p.slug}.title`)}</span>
              <span className="text-muted-foreground">{t(`${p.slug}.summary`)}</span>
              <span className="mt-1 flex flex-wrap gap-1.5">
                <Badge variant={p.status === "live" ? "soft" : "outline"}>{work(`status.${p.status}`)}</Badge>
                {p.stack.slice(0, 3).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </span>
            </span>
            {href && (
              <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-brand" />
            )}
          </>
        );
        return (
          <li key={p.slug} className="border-b border-border">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-6 py-6"
              >
                {body}
              </a>
            ) : (
              <div className="flex items-start justify-between gap-6 py-6">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
