# Portfolio — developer guide

Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui (Radix) · next-intl · next-themes · Motion · Lenis · Resend.
The original plan and every design decision live in [PORTFOLIO_PLAN.md](./PORTFOLIO_PLAN.md).

## Run it

```bash
pnpm install
cp .env.example .env.local   # optional — only needed for the contact form
pnpm dev                     # http://localhost:3000
```

| Script                                   | What it does                                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js                                                                                |
| `pnpm check`                             | typecheck + lint + translation key parity                                              |
| `pnpm test:e2e`                          | Playwright (builds and serves on :3100). First time: `npx playwright install chromium` |
| `pnpm format`                            | Prettier (with Tailwind class sorting)                                                 |

`/styleguide` (not linked, `noindex`) shows every colour token, type style, button, doodle and illustration pose.

## Common changes

| I want to…                                               | Edit                                                                                                                                                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change the accent colour                                 | `src/config/brand.ts` — the **only** place it is defined                                                                                                               |
| Change name, email, socials, stats, "available for work" | `src/config/site.ts`                                                                                                                                                   |
| Add my portrait                                          | put it at `public/images/me/portrait.jpg`, set `portrait` in `src/config/site.ts`                                                                                      |
| Add / edit a project                                     | data in `src/content/projects.ts`, text in `messages/*.json` → `Projects.<slug>`                                                                                       |
| Change any copy                                          | `messages/<locale>.json` (run `pnpm i18n:check` after)                                                                                                                 |
| Add a language                                           | add it to `src/i18n/routing.ts` + create `messages/<locale>.json`                                                                                                      |
| Tweak colours per theme                                  | `src/app/globals.css` (`:root` / `.dark`) — neutral = structure, gray = detail                                                                                         |
| Tweak animation timing                                   | `src/lib/motion.ts` (+ mirrored CSS vars in `globals.css`)                                                                                                             |
| Re-trace the face                                        | edit `scripts/peep/head-trace.tsv` (paths in headshot pixel coordinates), then `node scripts/peep/convert-trace.mjs > src/components/illustrations/peep/head-paths.ts` |
| Change outfit / poses / props                            | `src/components/illustrations/peep/parts.tsx` (suit, hands, cuffs) and `poses.tsx` (arms, props)                                                                       |
| Change illustration colours                              | `--peep-*` tokens in `src/app/globals.css` (skin, suit, tie, device…)                                                                                                  |

## Contact form

`src/app/[locale]/contact/actions.ts` validates with the same zod schema as the client
(`src/lib/contact-schema.ts`), has a honeypot field and a per-instance rate limit, then sends via Resend.
Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend) and optionally
`CONTACT_TO_EMAIL`. Without them the form tells visitors to email you directly.

## How the moving parts work

- **Loading screen** — `components/preloader/preloader.tsx`. Server-rendered so it covers the page before JS runs; only plays on full loads (client navigations never remount the root layout); shorter on repeat visits within a session; reduced-motion users get a quick fade. The hero waits for it via `useIntro()`.
- **Page transitions** — `components/motion/page-transition.tsx`. Use `TransitionLink` instead of `Link`: cover → navigate → reveal. Back/forward skips the curtain.
- **Theme switch** — circular reveal from the toggle using the View Transitions API, instant fallback elsewhere.
- **Illustrations** — traced from the reference photos in `public/images/me/`; Open Peeps-style rig (`components/illustrations/peep`), coloured only via `--peep-*` and `--brand` CSS variables, so it re-themes automatically. Blinks, breathes, follows the cursor, waves, draws itself in, and has a subtle "line boil" (SVG turbulence filter).
- **Signature** — generated single-stroke handwriting (`scripts/generate-signature.mjs`, EMS Allure font, SIL OFL).
- **Fonts** — Instrument Serif / Geist / Geist Mono / Caveat, with Playfair Display (Cyrillic) and Noto Sans/Serif SC (Chinese) as per-glyph fallbacks that only download when needed.

## Notes

- shadcn components were written by hand in the CLI's layout (`components.json` is present), because the
  shadcn registry was unreachable from the build environment. `pnpm dlx shadcn add <component>` works locally.
- Translations for fr/es/ru/zh were drafted by Claude and are gender-neutral where the grammar allows; have a native speaker review them before launch.
