import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };

// The real root layout lives in app/[locale]/layout.tsx. This pass-through is
// required because app/not-found.tsx exists at the root.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
