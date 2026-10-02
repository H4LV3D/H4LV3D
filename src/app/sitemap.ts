import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { localeTags, routing } from "@/i18n/routing";
import { caseStudies } from "@/content/projects";
import { notes } from "@/content/notes";
import { site } from "@/config/site";

const paths = [
  "/",
  "/about",
  "/work",
  "/notes",
  "/contact",
  ...caseStudies.map((p) => `/work/${p.slug}`),
  ...notes.map((n) => `/notes/${n.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((href) => ({
    url: site.url + getPathname({ href, locale: routing.defaultLocale }),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [localeTags[locale], site.url + getPathname({ href, locale })]),
      ),
    },
  }));
}
