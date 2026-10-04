import { cn } from "@/lib/utils";

export type OpenPeepDef = { readonly viewBox: string; readonly body: string };

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * An Open Peep (Pablo Stanley, CC0) pre-rendered by
 * scripts/generate-open-peeps.mjs. Lines use currentColor and fills
 * --peep-fill, so it follows the theme. Import the peep you need from
 * ./generated/<name> and pass it in, so only that peep is bundled.
 */
export function OpenPeep({
  peep,
  title,
  className,
  animate = true,
}: {
  peep: OpenPeepDef;
  title: string;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox={peep.viewBox}
      role="img"
      aria-label={title}
      className={cn("h-auto w-full overflow-visible text-[var(--art-ink)]", animate && "open-peep boil", className)}
      dangerouslySetInnerHTML={{ __html: `<title>${escape(title)}</title>${peep.body}` }}
    />
  );
}
