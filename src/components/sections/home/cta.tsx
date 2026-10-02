import { useTranslations } from "next-intl";

import { Peep } from "@/components/illustrations/peep/peep";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { TransitionLink } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { Doodle } from "@/components/illustrations/doodle";

export function HomeCta() {
  const t = useTranslations("Home.cta");
  return (
    <section className="container-page py-16">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-xl border border-border bg-card px-6 py-14 md:grid-cols-12 md:px-14 md:py-20">
        <div className="relative flex flex-col items-start gap-6 md:col-span-7">
          <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] italic">
            <SplitText text={t("title")} />
          </h2>
          <p className="max-w-md text-lg text-muted-foreground md:text-xl">{t("subtitle")}</p>
          <Magnetic>
            <Button asChild variant="brand" size="xl">
              <TransitionLink href="/contact">
                {t("button")}
                <ArrowRight />
              </TransitionLink>
            </Button>
          </Magnetic>
          <Doodle name="burst" className="absolute -top-8 right-4 size-14 md:right-20" />
        </div>
        <div className="mx-auto w-full max-w-xs md:col-span-5 md:max-w-sm">
          <Peep pose="sign" signText={t("sign")} />
        </div>
      </div>
    </section>
  );
}
