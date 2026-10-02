import { expect, test } from "@playwright/test";
import { waitForIntro } from "./helpers";

const locales = [
  { path: "/", lang: "en", greeting: "Hi, I'm" },
  { path: "/fr", lang: "fr", greeting: "Salut, moi c'est" },
  { path: "/es", lang: "es", greeting: "Hola, soy" },
  { path: "/ru", lang: "ru", greeting: "Привет, я" },
  { path: "/zh", lang: "zh-Hans", greeting: "你好，我是" },
];

for (const { path, lang, greeting } of locales) {
  test(`home renders in ${lang}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(greeting);
  });
}

test("preloader shows on load, then gets out of the way", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".preloader")).toBeVisible();
  await waitForIntro(page);
  await expect(page.locator("html")).not.toHaveClass(/preloading/);
});

test("header navigation plays the curtain transition", async ({ page }) => {
  await page.goto("/");
  await waitForIntro(page);
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Selected work");
});

test("theme toggle switches to dark mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  await waitForIntro(page);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("command palette navigates", async ({ page }) => {
  await page.goto("/");
  await waitForIntro(page);
  await page.keyboard.press("ControlOrMeta+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("combobox").fill("About");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/about$/);
});

test("language switcher keeps you on the same page", async ({ page }) => {
  await page.goto("/about");
  await waitForIntro(page);
  await page.getByRole("button", { name: "Language" }).click();
  await page.getByRole("menuitemradio", { name: "Français" }).click();
  await expect(page).toHaveURL(/\/fr\/about$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("work filters narrow the list", async ({ page }) => {
  await page.goto("/work");
  await waitForIntro(page);
  await expect(page.getByText("4 projects")).toBeVisible();
  await page.getByRole("button", { name: "Mobile" }).click();
  await expect(page.getByText("1 project", { exact: true })).toBeVisible();
});

test("case study pages render with metrics", async ({ page }) => {
  await page.goto("/work/coinsave");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coinsave");
  await expect(page.getByText("active users", { exact: true })).toBeVisible();
});

test("contact form validates input", async ({ page }) => {
  await page.goto("/contact");
  await waitForIntro(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please tell me your name.")).toBeVisible();
  await expect(page.getByText("That email doesn't look right.")).toBeVisible();
});

test("contact form reports when Resend isn't configured", async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY, "Resend is configured in this environment");
  await page.goto("/contact");
  await waitForIntro(page);
  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Message").fill("Hello! I'd love to build something together.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("The contact form isn't connected yet")).toBeVisible();
});

test("unknown pages show the localised 404", async ({ page }) => {
  const res = await page.goto("/fr/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cette page s'est égarée.");
});

test("SEO files are served", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/icon")).ok()).toBeTruthy();
  const og = await request.get("/en/opengraph-image");
  expect(og.headers()["content-type"]).toContain("image/png");
});
