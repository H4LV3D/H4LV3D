import type { Metadata, Viewport } from "next";

import "./cv.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/config/site";
import { brandCssVariables } from "@/config/brand";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — CV`,
  description: `CV of ${site.name}, senior frontend engineer moving into systems design and AI.`,
  alternates: { canonical: `${site.cvUrl}/` },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

/** Standalone root layout: the CV has no site chrome, just paper. */
export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} style={brandCssVariables}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
