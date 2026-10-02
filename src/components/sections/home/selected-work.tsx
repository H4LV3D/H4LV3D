import { useTranslations } from "next-intl";

import { projects } from "@/content/projects";
import { ProjectRows } from "@/components/sections/work/project-rows";
import { SectionLabel } from "@/components/sections/section-label";
import { SplitText } from "@/components/motion/split-text";
import { TransitionLink } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/illustrations/doodle-icons";

export function SelectedWork() {
  const t = useTranslations("Home.work");
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-6">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95]">
            <SplitText text={t("title")} />
          </h2>
        </div>
        <Button asChild variant="outline">
          <TransitionLink href="/work">
            {t("all")}
            <ArrowRight />
          </TransitionLink>
        </Button>
      </div>
      <ProjectRows projects={projects.slice(0, 4)} />
    </section>
  );
}
