import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide", "/*/styleguide"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
