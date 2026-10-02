"use client";

import * as React from "react";
import { m } from "motion/react";
import { useTranslations } from "next-intl";

import { projects, type ProjectCategory } from "@/content/projects";
import { ProjectRows } from "./project-rows";
import { ProjectGrid } from "./project-grid";
import { Grid, List } from "@/components/illustrations/doodle-icons";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "web", "mobile", "fullstack"];
const STORAGE_KEY = "work-layout";
const LAYOUT_EVENT = "work-layout-change";
let memoryLayout: "list" | "grid" = "list";

function readLayout(): "list" | "grid" {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "grid" || saved === "list" ? saved : memoryLayout;
  } catch {
    return memoryLayout;
  }
}

function writeLayout(l: "list" | "grid") {
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {
    memoryLayout = l;
  }
  window.dispatchEvent(new Event(LAYOUT_EVENT));
}

function subscribeLayout(cb: () => void) {
  window.addEventListener(LAYOUT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(LAYOUT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Filter chips + list/grid toggle (layout remembered per browser). */
export function WorkBrowser() {
  const t = useTranslations("Work");
  const [filter, setFilter] = React.useState<Filter>("all");
  const layout = React.useSyncExternalStore(subscribeLayout, readLayout, () => "list" as const);

  const changeLayout = writeLayout;

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section className="container-page">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div role="group" aria-label={t("filters.label")} className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === f
                  ? "border-transparent text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f && (
                <m.span
                  layoutId="work-filter"
                  className="absolute inset-0 -z-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t(`filters.${f}`)}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="label-mono text-muted-foreground">{t("count", { count: visible.length })}</span>
          <div role="group" aria-label={t("layout.label")} className="flex rounded-full border p-1">
            {(["list", "grid"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={layout === l}
                aria-label={t(`layout.${l}`)}
                onClick={() => changeLayout(l)}
                className={cn(
                  "flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors",
                  layout === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l === "list" ? <List className="size-4" /> : <Grid className="size-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      {layout === "list" ? <ProjectRows projects={visible} /> : <ProjectGrid projects={visible} />}
    </section>
  );
}
