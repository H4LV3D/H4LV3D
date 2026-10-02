import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { signature } from "@/components/illustrations/signature-paths";
import { routing, type Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The default OG font only covers Latin; fall back to English for ru/zh.
const LATIN = new Set<Locale>(["en", "fr", "es"]);

export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: LATIN.has(locale) ? locale : "en", namespace: "Meta" });
  const [, , w, h] = signature.viewBox.split(" ").map(Number);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f5f5",
        color: "#171717",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#4b5563",
        }}
      >
        <span>{site.name}</span>
        <span>toluwalope.tech</span>
      </div>
      <svg width={900} height={(900 * h) / w} viewBox={signature.viewBox}>
        <g fill="none" stroke="#171717" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
          {signature.paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
        <div style={{ width: 22, height: 22, borderRadius: 999, background: brand.accent }} />
        <span>{t("ogTagline")}</span>
      </div>
    </div>,
    size,
  );
}
