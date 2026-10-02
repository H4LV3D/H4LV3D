import type { Page } from "@playwright/test";

/** Wait for the preloader to finish so the page is interactive. */
export async function waitForIntro(page: Page) {
  await page.locator(".preloader").waitFor({ state: "detached", timeout: 15_000 });
}
