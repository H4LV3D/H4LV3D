"use client";

import * as React from "react";
import { m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { companies, projects, type ArchiveItem, type CaseStudy, type ProjectCategory } from "@/content/projects";
import { ProjectRows } from "./project-rows";
import { ProjectGrid } from "./project-grid";
import { ArchiveList } from "./archive-list";
import { ArrowUpRight, Grid, List } from "@/components/illustrations/doodle-icons";
import { Reveal } from "@/components/motion/reveal";
import { formatPeriod } from "@/lib/period";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "web", "mobile", "systems", "ai"];
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

/**
 * Work grouped by company, with filter chips and a list/grid toggle for the
 * case studies (layout remembered per browser).
 */
export function WorkBrowser() {
  const t = useTranslations("Work");
  const co = useTranslations("Companies");
  const locale = useLocale();
  const [filter, setFilter] = React.useState<Filter>("all");
  const layout = React.useSyncExternalStore(subscribeLayout, readLayout, () => "list" as const);

  const changeLayout = writeLayout;

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const groups = companies
    .map((company) => {
      const items = visible.filter((p) => p.company === company.id);
      return {
        company,
        cases: items.filter((p): p is CaseStudy => p.tier === "case-study"),
        archive: items.filter((p): p is ArchiveItem => p.tier === "archive"),
      };
    })
    // Companies whose projects are still being written up only show unfiltered.
    .filter((g) => g.cases.length + g.archive.length > 0 || filter === "all");

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
      <div className="flex flex-col gap-24 md:gap-32">
        {groups.map(({ company, cases, archive }) => (
          <section
            key={company.id}
            aria-labelledby={`company-${company.id}`}
            className="grid gap-8 border-t border-border pt-10 md:grid-cols-12 md:gap-10"
          >
            <Reveal className="flex flex-col gap-4 md:col-span-4">
              <div className="flex flex-col gap-4 md:sticky md:top-28">
                <p className="label-mono text-muted-foreground">
                  {formatPeriod(company.period, locale as Parameters<typeof formatPeriod>[1], t("group.present"))}
                </p>
                <h2 id={`company-${company.id}`} className="font-display text-5xl leading-[0.95] md:text-6xl">
                  {co(`${company.id}.name`)}
                </h2>
                <p className="text-lg">{co(`${company.id}.role`)}</p>
                <p className="text-muted-foreground">{co(`${company.id}.summary`)}</p>
                {company.url && (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noreferrer"
                    className="scribble-underline inline-flex w-fit items-center gap-1 text-sm"
                  >
                    {t("group.website")} <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </Reveal>
            <div className="flex flex-col gap-10 md:col-span-8">
              {cases.length > 0 &&
                (layout === "list" ? <ProjectRows projects={cases} compact /> : <ProjectGrid projects={cases} />)}
              {archive.length > 0 && <ArchiveList items={archive} />}
              {cases.length + archive.length === 0 && (
                <p className="font-hand text-2xl text-muted-foreground">{t("group.pending")}</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
