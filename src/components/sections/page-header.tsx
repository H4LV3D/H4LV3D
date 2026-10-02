import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "./section-label";

/** Shared page header: label, huge title, optional subtitle. */
export function PageHeader({
  label,
  title,
  subtitle,
  children,
}: {
  label: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-page flex flex-col gap-8 pt-36 pb-12 md:pt-48 md:pb-20">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="max-w-5xl font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.02em] text-balance">
        <SplitText text={title} delay={0.2} />
      </h1>
      {subtitle && (
        <Reveal delay={0.4} immediate>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>
        </Reveal>
      )}
      {children}
    </header>
  );
}
