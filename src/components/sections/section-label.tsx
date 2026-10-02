import { cn } from "@/lib/utils";

/** "02 / Selected work" style label with a short rule. */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-muted-foreground", className)}>
      <span aria-hidden className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}
