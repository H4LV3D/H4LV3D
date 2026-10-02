import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { SectionLabel } from "@/components/sections/section-label";
import { ContactBody } from "@/components/sections/contact/contact-aside";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor(locale, "/contact") };
}

const FAQ = ["projects", "start", "remote"] as const;

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <ContactBody />
      <section className="container-page mt-32 grid items-start gap-10 md:grid-cols-12">
        <SectionLabel className="md:col-span-4">{t("faq.title")}</SectionLabel>
        <Accordion type="single" collapsible className="border-t border-border md:col-span-8">
          {FAQ.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{t(`faq.${key}.q`)}</AccordionTrigger>
              <AccordionContent>{t(`faq.${key}.a`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
