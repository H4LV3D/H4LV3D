import { expect, test } from "@playwright/test";
import { waitForIntro } from "./helpers";

test("mobile menu opens and navigates", async ({ page }) => {
  await page.goto("/");
  await waitForIntro(page);
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: /Contact/ }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("no horizontal scroll on phones", async ({ page }) => {
  for (const path of [
    "/",
    "/about",
    "/work",
    "/work/coinsave",
    "/work/circular-ticket",
    "/notes",
    "/notes/filter-before-you-think",
    "/contact",
  ]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
