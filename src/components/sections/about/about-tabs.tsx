"use client";

import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toolkit } from "@/content/projects";
import { Timeline } from "./timeline";

const APPROACH = ["communication", "collaboration", "adaptability", "time", "problems", "creativity"] as const;

export function AboutTabs() {
  const t = useTranslations("About");
  return (
    <Tabs defaultValue="experience">
      <TabsList>
        <TabsTrigger value="experience">{t("tabs.experience")}</TabsTrigger>
        <TabsTrigger value="toolkit">{t("tabs.toolkit")}</TabsTrigger>
        <TabsTrigger value="approach">{t("tabs.approach")}</TabsTrigger>
      </TabsList>

      <TabsContent value="experience">
        <Timeline />
      </TabsContent>

      <TabsContent value="toolkit">
        <div className="grid gap-10 sm:grid-cols-2">
          {(Object.keys(toolkit) as (keyof typeof toolkit)[]).map((group) => (
            <div key={group} className="flex flex-col gap-4 border-t border-border pt-5">
              <h3 className="label-mono text-muted-foreground">{t(`toolkit.${group}`)}</h3>
              <div className="flex flex-wrap gap-2">
                {toolkit[group].map((tool) => (
                  <Badge key={tool} className="px-2.5 py-1 text-[0.7rem]">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="approach">
        <Accordion type="single" collapsible defaultValue="communication" className="border-t border-border">
          {APPROACH.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{t(`approach.${key}.title`)}</AccordionTrigger>
              <AccordionContent>{t(`approach.${key}.body`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}
