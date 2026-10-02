import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { localeTags } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { getNoteContent, notes, readingMinutes } from "@/content/notes";
import { PageHeader } from "@/components/sections/page-header";
import { TransitionLink } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/illustrations/doodle-icons";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Notes" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor(locale, "/notes") };
}

export default async function NotesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Notes");
  const date = new Intl.DateTimeFormat(localeTags[locale], { dateStyle: "medium", timeZone: "UTC" });

  return (
    <>
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <section className="container-page">
        <ul className="border-t border-border">
          {notes.map((note, i) => {
            const c = getNoteContent(note.slug, locale);
            return (
              <Reveal as="li" key={note.slug} delay={i * 0.05} className="border-b border-border">
                <TransitionLink
                  href={`/notes/${note.slug}`}
                  transitionLabel={c.title}
                  data-cursor={t("read")}
                  className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-12"
                >
                  <span className="label-mono text-muted-foreground md:col-span-3 md:pt-3">
                    {date.format(new Date(note.date))} · {t("readingTime", { minutes: readingMinutes(c, locale) })}
                  </span>
                  <span className="flex flex-col gap-3 md:col-span-8">
                    <span className="font-display text-4xl leading-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:italic md:text-6xl">
                      {c.title}
                    </span>
                    <span className="max-w-2xl text-lg text-muted-foreground">{c.summary}</span>
                  </span>
                  <ArrowUpRight className="hidden size-9 text-muted-foreground transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-brand md:col-span-1 md:block md:justify-self-end" />
                </TransitionLink>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </>
  );
}
