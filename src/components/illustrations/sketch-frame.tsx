import { cn } from "@/lib/utils";

/**
 * Hand-drawn rectangle that stretches to any aspect ratio while keeping a
 * constant stroke width. Shown on hover of the nearest `.group` parent.
 */
export function SketchFrame({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute -inset-1.5 z-10 h-[calc(100%+12px)] w-[calc(100%+12px)] scale-[0.97] -rotate-[0.4deg] text-foreground opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100",
        className,
      )}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        <path vectorEffect="non-scaling-stroke" d="M2 4 C 60 2, 140 3, 198 3.5" />
        <path vectorEffect="non-scaling-stroke" d="M197 1.5 C 198.5 60, 198 140, 196.5 198" />
        <path vectorEffect="non-scaling-stroke" d="M198.5 196 C 140 198.5, 60 197.5, 2.5 196.5" />
        <path vectorEffect="non-scaling-stroke" d="M3.5 199 C 1.5 140, 2 60, 3 1.5" />
      </g>
    </svg>
  );
}
