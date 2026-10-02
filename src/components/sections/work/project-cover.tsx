import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { doodles } from "@/components/illustrations/doodle-paths";

const marks = ["star", "sparkle", "heart", "burst"] as const;

/**
 * Designed monochrome cover used until real screenshots exist
 * (TODO(content): add public/work/<slug>/cover.jpg and swap this out).
 */
export function ProjectCover({
  project,
  title,
  tagline,
  className,
  size = "md",
}: {
  project: Project;
  title: string;
  tagline: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const mark = doodles[marks[Number(project.index) % marks.length]];
  return (
    <div
      className={cn(
        "relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-md border border-border bg-card p-5 text-card-foreground md:p-7",
        className,
      )}
    >
      {/* Ruled sketchbook lines */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,var(--border)_27px,var(--border)_28px)] opacity-60"
      />
      <div className="flex items-start justify-between">
        <span className="label-mono text-muted-foreground">{project.index}</span>
        <svg viewBox={mark.viewBox} aria-hidden className={cn("text-brand", size === "lg" ? "size-16" : "size-10")}>
          {mark.strokes.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={"fill" in mark && mark.fill ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={mark.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
      <div>
        <p
          className={cn(
            "font-display leading-[0.9] italic",
            size === "sm" && "text-4xl",
            size === "md" && "text-5xl md:text-6xl",
            size === "lg" && "text-6xl md:text-8xl",
          )}
        >
          {title}
        </p>
        <p className="mt-2 font-hand text-xl text-muted-foreground md:text-2xl">{tagline}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-sm border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
