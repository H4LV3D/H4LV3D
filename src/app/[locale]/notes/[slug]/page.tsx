import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { localeTags, routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { getNextNote, getNote, getNoteContent, notes, readingMinutes } from "@/content/notes";
import { diagrams } from "@/content/diagrams";
import { SectionLabel } from "@/components/sections/section-label";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/motion/page-transition";
import { SystemDiagram } from "@/components/illustrations/system-diagram";
import { Doodle } from "@/components/illustrations/doodle";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => notes.map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  const c = getNoteContent(note.slug, locale);
  return {
    title: c.title,
    description: c.summary,
    alternates: alternatesFor(locale, `/notes/${slug}`),
    openGraph: { type: "article", publishedTime: note.date },
  };
}

export default async function NotePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const note = getNote(slug);
  if (!note) notFound();

  const t = await getTranslations("Notes");
  const projects = await getTranslations("Projects");
  const c = getNoteContent(note.slug, locale);
  const next = getNextNote(note.slug);
  const nextContent = getNoteContent(next.slug, locale);
  const date = new Intl.DateTimeFormat(localeTags[locale], { dateStyle: "long", timeZone: "UTC" });

  return (
    <article>
      <header className="container-page flex flex-col gap-8 pt-32 md:pt-44">
        <TransitionLink
          href="/notes"
          className="label-mono scribble-underline w-fit text-muted-foreground hover:text-foreground"
        >
          ← {t("back")}
        </TransitionLink>
        <SectionLabel>
          <time dateTime={note.date}>{date.format(new Date(note.date))}</time> ·{" "}
          {t("readingTime", { minutes: readingMinutes(c, locale) })}
        </SectionLabel>
        <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-balance">
          <SplitText text={c.title} delay={0.2} />
        </h1>
        <Reveal immediate delay={0.4}>
          <p className="max-w-2xl text-xl text-pretty text-muted-foreground md:text-2xl">{c.summary}</p>
        </Reveal>
      </header>

      <div className="container-page mt-16 flex flex-col gap-6 md:mt-24">
        {c.blocks.map((b, i) => {
          switch (b.type) {
            case "h":
              return (
                <h2 key={i} className="mx-auto mt-10 w-full max-w-2xl font-display text-3xl md:text-4xl">
                  {b.text}
                </h2>
              );
            case "p":
              return (
                <p key={i} className="mx-auto w-full max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
                  {b.text}
                </p>
              );
            case "list":
              return (
                <ul key={i} className="mx-auto flex w-full max-w-2xl flex-col gap-3">
                  {b.items.map((item) => (
                    <li key={item} className="flex gap-4 text-lg leading-relaxed md:text-xl">
                      <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "diagram":
              return (
                <figure key={i} className="my-10 flex flex-col gap-4">
                  <SystemDiagram diagram={diagrams[b.id]} title={b.caption} />
                  <figcaption className="text-center font-hand text-xl text-muted-foreground">{b.caption}</figcaption>
                </figure>
              );
          }
        })}
      </div>

      {note.related && (
        <div className="container-page mt-16">
          <div className="mx-auto max-w-2xl border-t border-border pt-6">
            <p className="label-mono text-muted-foreground">{t("related")}</p>
            <TransitionLink
              href={`/work/${note.related}`}
              transitionLabel={projects(`${note.related}.title`)}
              className="scribble-underline mt-2 inline-flex items-center gap-2 font-display text-3xl"
            >
              {projects(`${note.related}.title`)} <ArrowRight className="size-5" />
            </TransitionLink>
          </div>
        </div>
      )}

      <section className="container-page mt-32">
        <TransitionLink
          href={`/notes/${next.slug}`}
          transitionLabel={nextContent.title}
          data-cursor={t("next")}
          className="group flex flex-col gap-4 border-t border-border pt-10"
        >
          <span className="label-mono text-muted-foreground">{t("next")}</span>
          <span className="relative w-fit font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] transition-transform duration-700 ease-out-expo group-hover:translate-x-4 group-hover:italic">
            {nextContent.title}
            <Doodle name="underline" className="absolute -bottom-3 left-0 h-[0.15em] w-full" />
          </span>
          <span className="max-w-2xl text-muted-foreground">{nextContent.summary}</span>
        </TransitionLink>
        <div className="mt-10">
          <Button asChild variant="outline">
            <TransitionLink href="/notes">
              {t("back")} <ArrowRight />
            </TransitionLink>
          </Button>
        </div>
      </section>
    </article>
  );
}
