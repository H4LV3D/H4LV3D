import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Doodle } from "@/components/illustrations/doodle";
import { doodles, type DoodleName } from "@/components/illustrations/doodle-paths";
import { OpenPeep } from "@/components/illustrations/open-peeps/open-peep";
import { peep as coffee } from "@/components/illustrations/open-peeps/generated/coffee";
import { peep as phone } from "@/components/illustrations/open-peeps/generated/phone";
import { peep as pointing } from "@/components/illustrations/open-peeps/generated/pointing";
import { peep as shrug } from "@/components/illustrations/open-peeps/generated/shrug";
import { peep as explaining } from "@/components/illustrations/open-peeps/generated/explaining";
import { peep as armsCrossed } from "@/components/illustrations/open-peeps/generated/armsCrossed";
import { ArrowRight } from "@/components/illustrations/doodle-icons";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const neutrals = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const poses = { coffee, phone, pointing, shrug, explaining, armsCrossed };

/** Internal design-system reference: tokens, components, doodles and poses. */
export default async function Styleguide({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container-page flex flex-col gap-20 pt-32 pb-20">
      <h1 className="font-display text-7xl">Styleguide</h1>

      <section className="flex flex-col gap-4">
        <p className="label-mono text-muted-foreground">Colour</p>
        {(["neutral", "gray"] as const).map((family) => (
          <div key={family} className="grid grid-cols-9 gap-2">
            {neutrals.map((n) => (
              <div key={n} className="flex flex-col gap-1">
                <div className="h-14 rounded-md border" style={{ background: `var(--color-${family}-${n})` }} />
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {family}-{n}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-2">
          <div className="h-14 w-40 rounded-md bg-brand" />
          <div className="h-14 w-40 rounded-md bg-brand-soft" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <p className="label-mono text-muted-foreground">Type</p>
        <p className="font-display text-8xl leading-none">
          Display <em>italic</em>
        </p>
        <p className="font-display text-6xl leading-none">Русский · 中文显示</p>
        <p className="text-xl">Geist body — The quick brown fox. Быстрая лиса. 敏捷的狐狸。</p>
        <p className="font-hand text-3xl">Caveat — margin notes ← like this</p>
        <p className="label-mono">01 / mono label</p>
      </section>

      <section className="flex flex-wrap items-center gap-4">
        <Button>
          Default <ArrowRight />
        </Button>
        <Button variant="brand">Brand</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="sketch">Sketch</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Badge>React</Badge>
        <Badge variant="brand">Live</Badge>
        <Badge variant="soft">Soft</Badge>
      </section>

      <section className="grid grid-cols-3 gap-8 md:grid-cols-5">
        {(Object.keys(doodles) as DoodleName[]).map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Doodle name={name} className="h-16 w-full" draw="inView" />
            <span className="label-mono text-muted-foreground">{name}</span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {Object.entries(poses).map(([name, def]) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <OpenPeep peep={def} title={name} className="w-full" />
            <span className="label-mono text-muted-foreground">{name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
