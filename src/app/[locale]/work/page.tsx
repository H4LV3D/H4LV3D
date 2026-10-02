import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/sections/page-header";
import { WorkBrowser } from "@/components/sections/work/work-browser";
import { alternatesFor } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor(locale, "/work") };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Work");

  return (
    <>
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <WorkBrowser />
    </>
  );
}
