import { useTranslations } from "next-intl";

import { Peep } from "@/components/illustrations/peep/peep";
import { TransitionLink } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { SectionLabel } from "@/components/sections/section-label";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="container-page grid min-h-svh items-center gap-12 pt-28 pb-16 md:grid-cols-12">
      <div className="flex flex-col items-start gap-6 md:col-span-6">
        <SectionLabel>{t("label")}</SectionLabel>
        <h1 className="font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] italic">{t("title")}</h1>
        <p className="max-w-md text-lg text-muted-foreground">{t("body")}</p>
        <Button asChild size="lg">
          <TransitionLink href="/">
            {t("back")} <ArrowRight />
          </TransitionLink>
        </Button>
      </div>
      <div className="mx-auto w-full max-w-md md:col-span-6">
        <Peep pose="lost" />
      </div>
    </section>
  );
}
