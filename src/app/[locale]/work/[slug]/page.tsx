import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getNextProject, getProject, projects } from "@/content/projects";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { SectionLabel } from "@/components/sections/section-label";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { TransitionLink } from "@/components/motion/page-transition";
import { ProjectCover } from "@/components/sections/work/project-cover";
import { Doodle } from "@/components/illustrations/doodle";
import { ArrowRight, ArrowUpRight } from "@/components/illustrations/doodle-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: `${t(`${project.slug}.title`)} — ${t(`${project.slug}.tagline`)}`,
    description: t(`${project.slug}.summary`),
    alternates: alternatesFor(locale, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Projects");
  const w = await getTranslations("Work");
  const next = getNextProject(project.slug);
  const key = project.slug;

  const sections = [
    { id: "problem", title: w("caseStudy.problem"), body: t(`${key}.problem`) },
    { id: "process", title: w("caseStudy.process"), body: t(`${key}.process`) },
    { id: "outcome", title: w("caseStudy.outcome"), body: t(`${key}.outcome`) },
    { id: "learnings", title: w("caseStudy.learnings"), body: t(`${key}.learnings`) },
  ];

  return (
    <article>
      <header className="container-page flex flex-col gap-8 pt-32 md:pt-44">
        <TransitionLink
          href="/work"
          className="label-mono scribble-underline w-fit text-muted-foreground hover:text-foreground"
        >
          ← {w("caseStudy.back")}
        </TransitionLink>
        <SectionLabel>
          {project.index} / {t(`${key}.tagline`)}
        </SectionLabel>
        <h1 className="font-display text-[clamp(4rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em] italic">
          <SplitText text={t(`${key}.title`)} by="char" stagger={0.05} delay={0.2} />
        </h1>
        <Reveal immediate delay={0.4}>
          <p className="max-w-2xl text-xl text-pretty text-muted-foreground md:text-2xl">{t(`${key}.summary`)}</p>
        </Reveal>
      </header>

      <Reveal immediate delay={0.5} className="container-page mt-14">
        <dl className="grid grid-cols-2 gap-8 border-y border-border py-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <dt className="label-mono text-muted-foreground">{w("caseStudy.role")}</dt>
            <dd>{t(`${key}.role`)}</dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="label-mono text-muted-foreground">
              {project.year ? w("caseStudy.year") : w("caseStudy.status")}
            </dt>
            <dd>
              {project.year ?? (
                <Badge variant={project.status === "live" ? "brand" : "outline"}>{w(`status.${project.status}`)}</Badge>
              )}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="label-mono text-muted-foreground">{w("caseStudy.stack")}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="label-mono text-muted-foreground">{w("caseStudy.links")}</dt>
            <dd className="flex flex-col gap-1">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="scribble-underline inline-flex w-fit items-center gap-1"
                >
                  {w("caseStudy.live")} <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="scribble-underline inline-flex w-fit items-center gap-1"
                >
                  {w("caseStudy.code")} <ArrowUpRight className="size-4" />
                </a>
              )}
              {!project.links.live && !project.links.code && (
                <span className="text-muted-foreground">{w("caseStudy.noLinks")}</span>
              )}
            </dd>
          </div>
        </dl>
      </Reveal>

      <Reveal className="container-page mt-16">
        <ProjectCover
          project={project}
          title={t(`${key}.title`)}
          tagline={t(`${key}.tagline`)}
          size="lg"
          className="aspect-[16/9] md:aspect-[21/9]"
        />
        <p className="mt-3 font-hand text-lg text-muted-foreground">{w("caseStudy.imagePending")}</p>
      </Reveal>

      {project.metrics.length > 0 && (
        <section className="container-page mt-24 grid gap-10 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <Reveal key={metric.label} className="flex flex-col gap-2 border-t border-border pt-6">
              <span className="font-display text-7xl md:text-8xl">
                <CountUp value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
              </span>
              <span className="label-mono text-muted-foreground">{t(`metrics.${metric.label}`)}</span>
            </Reveal>
          ))}
        </section>
      )}

      <div className="container-page mt-24 flex flex-col gap-20 md:mt-32 md:gap-28">
        {sections.map((s, i) => (
          <section key={s.id} className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <p className="label-mono text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">{s.title}</h2>
              </div>
            </div>
            <Reveal className="md:col-span-7 md:col-start-6">
              <p className="text-xl leading-relaxed text-pretty md:text-2xl">{s.body}</p>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="container-page mt-32">
        <TransitionLink
          href={`/work/${next.slug}`}
          transitionLabel={t(`${next.slug}.title`)}
          data-cursor={w("caseStudy.next")}
          className="group flex flex-col gap-4 border-t border-border pt-10"
        >
          <span className="label-mono text-muted-foreground">{w("caseStudy.next")}</span>
          <span className="relative w-fit font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] transition-transform duration-700 ease-out-expo group-hover:translate-x-4 group-hover:italic">
            {t(`${next.slug}.title`)}
            <Doodle name="underline" className="absolute -bottom-3 left-0 h-[0.15em] w-full" />
          </span>
          <span className="text-muted-foreground">{t(`${next.slug}.tagline`)}</span>
        </TransitionLink>
        <div className="mt-10">
          <Button asChild variant="outline">
            <TransitionLink href="/work">
              {w("caseStudy.back")} <ArrowRight />
            </TransitionLink>
          </Button>
        </div>
      </section>
    </article>
  );
}
