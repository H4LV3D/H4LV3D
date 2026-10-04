// Renders /cv to public/toluwalope-akinkunmi-cv.pdf (two A4 pages).
// Usage: start the site (pnpm build && pnpm start), then
//   pnpm cv:pdf [url]        default url: http://localhost:3000/cv
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3000/cv";
const out = "public/toluwalope-akinkunmi-cv.pdf";

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });

// Refuse to write a PDF where a page's content runs past the bottom margin.
const overflow = await page.$$eval(".cv-page", (pages) => pages.map((p) => p.scrollHeight > p.clientHeight + 1));
if (overflow.some(Boolean)) {
  console.error(
    `CV content overflows page(s): ${overflow
      .map((o, i) => (o ? i + 1 : null))
      .filter(Boolean)
      .join(", ")}`,
  );
  process.exit(1);
}

await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`wrote ${out}`);
