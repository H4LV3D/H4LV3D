# Portfolio v2 — Build Plan

> Status: **decisions locked, building on branch `portfolio-v1`.** Where the original questions (kept below for the record) and the locked decisions disagree, the locked decisions win.

## Locked decisions

| # | Decision |
|---|----------|
| 1 | Code lives on a separate **`portfolio-v1`** branch of this repo. The profile README on `main` is untouched. |
| 2 | Accent is **Signal Orange `#FF5B1F`**, set in **one place**: `src/config/brand.ts`. CSS variables, OG images, and the browser theme colour all read from it. |
| 3 | Languages: **English (default), French, Spanish, Russian, Chinese (Simplified)**. Russian and Chinese need Cyrillic and CJK fallback fonts in every font stack (§2.5). |
| 4 | **Claude draws the illustrations**: an Open Peeps-style rig drawn as SVG, with a placeholder likeness until your photos arrive. |
| 5 | Contact form: **server action + Resend** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`). |
| 6 | Pages: core 4 + case studies + 404. **No** `/now` or `/uses`. |
| 7 | Vercel on **toluwalope.tech** (you're renewing the domain). |
| 8 | **No** location or clock anywhere on the site. |
| — | All other ✅ defaults are accepted: no localised slugs, shorter preloader on repeat visits in a session, photos stay grayscale. |
| — | Change from the plan: case-study text lives in the translation files (one typed JSON per locale) instead of per-locale MDX. Every project is fully translated, and there's one fewer build dependency. |

---

## 0. Original decision questions (answered above)

| # | Question | Default I'd go with | Why it matters |
|---|----------|---------------------|----------------|
| ❓1 | **Where does the code live?** This repo (`H4LV3D/H4LV3D`) is your GitHub *profile README* repo. | A **new repo** (e.g. `H4LV3D/portfolio`). Second choice: a `portfolio/` subfolder here. | A Next.js app at the root here would bury your profile README under config files. |
| ❓2 | **Accent colour** (exactly one) | **Signal Orange `#FF5B1F`**. See §2.3 for the others. | Every token, doodle, and focus ring uses it. |
| ❓3 | **Languages** | `en` (default) + `fr` + `yo` (Yorùbá) | Affects fonts (diacritics), copy volume, and whether we need RTL. |
| ❓4 | **Who draws the illustrated "you"?** | Start from **Open Peeps (CC0) parts** customised to look like you (hair, glasses, outfit), then refine. | This decides how far the illustration can go (see §5.1). |
| ❓5 | **Contact form backend** | Server Action + **Resend** (free tier) | A plain `mailto:` needs nothing; Resend needs an API key and a verified domain. |
| ❓6 | **Pages beyond the 4 core ones** | Core 4 + `/work/[slug]` case studies + custom 404. Optional: `/now` or `/uses`. | Scope and timeline. |
| ❓7 | **Domain/hosting** | Vercel on `toluwalope.tech` | DNS, OG URLs, and sitemap use it. |
| ❓8 | **Location/timezone shown on the site** | "Lagos, NG — 14:32" live clock in the footer | Small personal touch; skip it if you'd rather not show your location. |

---

## 1. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16+ (App Router)**, React 19, TypeScript strict | Pages are statically rendered; the contact form is the only server code. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Tokens live in `globals.css`. |
| Components | **shadcn/ui** (latest CLI, `neutral` base, then heavily restyled) | You own the source in `components/ui`. |
| i18n | **next-intl** | Locale-prefixed routes, typed messages, `proxy.ts` (Next 16's renamed middleware). |
| Theming | **next-themes** (`class` strategy, `system` default) | No flash of the wrong theme. |
| Animation | **Motion** (`motion/react`) with `LazyMotion` + `m.*` | One animation library for UI, SVG drawing, and page transitions. |
| Smooth scroll | **Lenis** | Turned off when reduced motion is on. |
| Hand-drawn annotations | Own `<Doodle>` SVG library (+ optionally `rough-notation` for underline/circle/highlight) | |
| Content | **MDX** case studies per locale (via `content-collections`) | Typed frontmatter. |
| Forms | shadcn `Form` + react-hook-form + zod | The same zod schema validates on the client and in the server action. |
| Icons | `lucide-react`, swapped for hand-drawn SVGs wherever they're visible | |
| Tooling | pnpm, ESLint (flat config), Prettier + `prettier-plugin-tailwindcss`, Playwright smoke tests | |
| Deploy | Vercel | |

---

## 2. Design system

### 2.1 Principles
1. **Monochrome first.** About 95% of every screen is neutral or gray.
2. **One accent, used sparingly.** It means "look here" or "you can act on this", never decoration.
3. **Hand-drawn warmth on a strict grid.** Typography and layout are rigid; illustrations and doodles are loose and imperfect.
4. **Motion has a purpose.** Everything animates in once, reacts to the user, and respects `prefers-reduced-motion`.

### 2.2 Colour roles: `neutral` vs `gray`
Tailwind's `neutral` is pure gray. Tailwind's `gray` has a slight cool/blue tint. Mixing them freely looks muddy, so each gets a role:

- **`neutral`** → structure: page background, text, cards, primary buttons.
- **`gray`** → detail: borders, inputs, muted/secondary text, illustration shading. Its slight coolness adds depth while the site still reads as monochrome.
- `50`/`950` only at the extremes (card on light, deepest shadow on dark).

### 2.3 Accent options (pick one)

| Name | Hex | Feel | Caveat |
|---|---|---|---|
| **Signal Orange** ✅ | `#FF5B1F` | Marker pen, energetic, warm against neutrals | Large text or graphics only on light bg (~3:1) |
| Volt Lime | `#C6F432` | Techy, loud, great in dark mode | Can't be text on light bg; use as fill with neutral-900 text |
| Klein Blue | `#2B3BFF` | Artsy, confident, AA as text on light | Less "hand-drawn" |
| Poppy Red | `#F2353B` | Bold, editorial | Clashes with error states; destructive would need a different hue |

Each accent gets 3 tokens: `--brand` (base), `--brand-foreground` (text on it), and `--brand-soft` (10–15% alpha for hover washes and selection).

### 2.4 Token map (shadcn variable → value)

> ⚠️ shadcn's `--accent` token is **not** a brand accent. It's the hover background for ghost buttons and menus. It stays neutral, and our one colour lives in a new `--brand` token.

| Token | Light | Dark |
|---|---|---|
| `--background` | neutral-100 `#f5f5f5` | neutral-900 `#171717` |
| `--foreground` | neutral-900 `#171717` | neutral-100 `#f5f5f5` |
| `--card` / `--popover` | neutral-50 `#fafafa` | neutral-800 `#262626` |
| `--primary` | neutral-900 | neutral-100 |
| `--primary-foreground` | neutral-100 | neutral-900 |
| `--secondary` | neutral-200 `#e5e5e5` | neutral-800 |
| `--muted` | neutral-200 | neutral-800 |
| `--muted-foreground` | gray-600 `#4b5563` (AA ✓) | gray-400 `#9ca3af` (AA ✓) |
| `--accent` (hover surface) | neutral-200 | neutral-700 `#404040` |
| `--border` / `--input` | gray-300 `#d1d5db` | gray-700 `#374151` |
| `--ring` | `--brand` | `--brand` |
| `--brand` | accent | accent (lifted ~5% L if needed) |
| `--destructive` | red-600 (form errors only) | red-400 |
| `--peep-line` | neutral-900 | neutral-100 |
| `--peep-fill` | neutral-50 | neutral-800 |
| `--peep-shade` | gray-300 | gray-700 |
| `::selection` | brand bg + neutral-900 text | same |

The final CSS uses Tailwind's OKLCH values. Hex is shown here for readability.

**Where the accent appears:** focus rings · link hover underline · active nav scribble · primary CTA hover fill · preloader progress dot · cursor ring on hover · one prop per illustration (mug, laptop sticker, hoodie stripe) · one doodle per section · "available for work" pulse · text selection. **Nowhere else.**

### 2.5 Typography

| Role | Font | Use |
|---|---|---|
| Display | **Instrument Serif** (incl. italic) → Cyrillic fallback **Playfair Display** → CJK fallback **Noto Serif SC** | Hero name, page titles, big CTA. Italics for emphasis words |
| Body / UI | **Geist Sans** → CJK fallback **Noto Sans SC** | Everything else |
| Mono | **Geist Mono** | Labels, tags, counters, metadata (`01 / WORK`) |
| Hand | **Caveat** | Margin notes next to doodles ("← that's me!") |

All four load through `next/font`. If Yorùbá is in scope, every font must render combining dot-below and tone marks (ẹ́, ọ̀, ṣ). We check this with a test string before committing to a font and swap any that fail.

Type scale is fluid with `clamp()`: hero 4.5rem → 11rem, h1 3rem → 6rem, body 1rem → 1.125rem.

### 2.6 Shape, space, texture
- `--radius: 0.375rem`. Cards get a hand-drawn border on hover instead of more rounding.
- 12-column grid, 1440px max width, 16px side gutter on mobile, 4px spacing base.
- A very subtle **film-grain noise overlay** (SVG `feTurbulence`, 3–4% opacity) on the background in both modes, so the flat greys feel like paper.
- Photos: `grayscale(1) contrast(1.05)`. ❓ Should project screenshots regain colour on hover? Default: no, they stay monochrome.

### 2.7 Motion tokens (`lib/motion.ts` + CSS vars)

| Token | Value | Use |
|---|---|---|
| `dur.fast` | 150ms | hovers, toggles |
| `dur.base` | 300ms | menus, small reveals |
| `dur.slow` | 600ms | section reveals |
| `dur.xslow` | 1000ms | hero, curtains |
| `ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) | entrances |
| `ease.inOut` | `cubic-bezier(0.76, 0, 0.24, 1)` (quart) | curtains, preloader exit |
| `spring.snappy` | `{ stiffness: 400, damping: 30 }` | magnetic buttons, toggles |
| `spring.soft` | `{ stiffness: 120, damping: 20 }` | cursor, peep head-tracking |
| `stagger` | 0.06s | lists, split text |

Global `<MotionConfig reducedMotion="user">`. With reduced motion, transforms become opacity-only fades, and Lenis, the custom cursor, and the line-boil effect are switched off.

---

## 3. shadcn components and how each gets personalised

| Component | Where | Customisation |
|---|---|---|
| **Button** | everywhere | Variants: `default` (neutral-900 fill; on hover a brand fill wipes in from the left), `outline` (hover draws a hand-drawn SVG border), `ghost`, `link` (scribble underline draws on hover), new **`brand`**, new **`sketch`**. Arrow icon slides on hover. Optional `magnetic` wrapper. |
| **Navigation Menu** | desktop header | Active item gets a hand-drawn scribble underline that animates between items (`layoutId`). |
| **Sheet** | mobile menu | Full-screen with huge display-serif links, staggered in, and a small peep waving at the bottom. |
| **Dropdown Menu** | locale + theme switchers | Mono labels, check doodle on the active item. |
| **Command** (+ Dialog) | `⌘K` palette | Jump to pages, toggle theme, switch language, copy email, open socials. |
| **Card** | project cards | No shadow. Hover → border redraws as a sketch and the image scales 1.03. |
| **Badge** | tech tags | Mono, uppercase, outline, `gray` border. |
| **Tabs** | About (Experience / Education / Toolkit) | Indicator is a hand-drawn underline. |
| **Accordion** | Contact FAQ, About "how I work" | Plus icon → hand-drawn ×. |
| **Tooltip / Hover Card** | social icons, tech logos | Neutral-900 bubble, Caveat font. |
| **Form, Input, Textarea, Label, Select** | Contact | Underline-only inputs; focus draws the underline in brand. |
| **Sonner** | form success, "email copied" | Toast includes a tiny thumbs-up peep. |
| **Separator** | section dividers | Replaced by a squiggle SVG variant. |
| **Skeleton** | `loading.tsx` for case studies | Shimmer in gray tones. |
| **Avatar** | footer/contact | Your photo, grayscale. |
| **Breadcrumb** | case study pages | Mono, slash separators. |

All shadcn source stays in `components/ui/*` and is edited directly. That's the point of shadcn: the components are yours, not a dependency.

---

## 4. Information architecture and page specs

```
/[locale]                 Home
/[locale]/about           About
/[locale]/work            Work index
/[locale]/work/[slug]     Case study (×N)
/[locale]/contact         Contact
/[locale]/(404)           Custom not-found
(optional) /[locale]/now  "What I'm doing now"
```

### 4.1 Global shell
- **Header:** signature logo (SVG that redraws on hover) · nav · `⌘K` hint · theme toggle · locale switcher. Hides when scrolling down and reappears when scrolling up. Blurred translucent background after 40px of scroll.
- **Footer:** giant display-serif "Let's talk →" link, socials, live local clock, "Built with Next.js & a lot of coffee" in Caveat, a back-to-top doodle arrow, and the theme and locale controls again.
- **Custom cursor** (pointer devices only): 6px dot plus a 32px ring. Over links/buttons the ring grows and fills `--brand-soft`. Over project rows it becomes "View →".
- **Grain overlay**, **Lenis**, and a **skip-to-content** link.

### 4.2 Home
1. **Hero:** "Hi, I'm **Toluwalope**". The name is revealed line by line with a mask, and a brand-coloured hand-drawn circle draws around "Toluwalope". The role line rotates through *developer · problem solver · builder*. The **peep version of you** sits at a laptop: it blinks, breathes, follows the cursor with its head and eyes, and waves when you hover it. A doodle arrow says "scroll ↓" in Caveat.
2. **Intro paragraph:** large text that shifts from gray to neutral word by word as you scroll, with 2–3 key phrases underlined by doodles.
3. **Selected work:** 3–4 rows (index number · title · tags · year). On hover, a floating preview image follows the cursor and the row's title shifts right. Click goes to the case study with the curtain transition.
4. **Toolkit marquee:** two rows moving in opposite directions (React · Next.js · TypeScript · Node · Tailwind · MongoDB · MySQL · Redux · React Native · GraphQL). Hovering pauses and highlights.
5. **"Currently" strip:** learning React Native & GraphQL, contributing to open source. Each item has a small hand-drawn icon.
6. **CTA:** huge "Got an idea?" with a peep holding a sign, linking to Contact.

### 4.3 About
1. **Real me / drawn me:** your photo and your peep side by side. Hovering or tapping wipes between them with a hand-drawn mask edge. This is where your photos are used most.
2. **Story:** 2–3 short paragraphs with Caveat margin notes and doodle arrows.
3. **Experience timeline:** a vertical line draws itself as you scroll, and each entry's dot fills with brand when it reaches the centre.
4. **Tabs:** Experience · Education · Toolkit (grouped by Frontend / Backend / Mobile / Tooling).
5. **How I work:** an accordion built from the soft skills in your README.
6. **Off-screen:** games, series, books, OSS. Four small peep vignettes.
7. **CV download** button (PDF per locale if available).

### 4.4 Work index
- Filter chips: All · Web · Mobile · Full-stack. Filtering animates the items (`layout` + `AnimatePresence`).
- List/grid toggle, remembered in `localStorage`.
- Projects seeded from your README: **Reciept**, **Portfolio**, **Gen-Z Blog**, **Coinsave**, **Cabify**.
  - ⚠️ The Coinsave and Cabify links point to `*.cyclic.app`. Cyclic shut down in 2024, so those links are dead. ❓ Are there new URLs, repos, or screenshots for them?

### 4.5 Case study (`/work/[slug]`)
Hero (title, one-liner, cover) → meta grid (Role · Year · Stack · Links) → Problem → Process (with gallery) → Outcome (metrics as large mono counters that count up in view, e.g. *500+ users · 70% engagement · 4.5★*) → Learnings → **Next project** (a large link that runs the curtain transition).

### 4.6 Contact
- Peep holding an envelope. On successful submit the envelope flies off.
- Form: name · email · budget (Select, optional) · message · hidden honeypot field. Validated client and server side with the same zod schema, with basic rate limiting.
- "Copy email" button that shows a toast. Social links. An "Available for work" badge with a pulsing brand dot.
- A short FAQ accordion (availability, rates, timezone).

### 4.7 404
A peep looking at an upside-down map, "This page wandered off", and a button back home. The peep's head follows the cursor here too.

---

## 5. Illustration system (Open Peeps-style)

### 5.1 Sourcing (❓4)

| Option | Likeness | Effort | Notes |
|---|---|---|---|
| **A. Open Peeps parts, customised** ✅ | Good (stylised) | Low | CC0. Pick the closest head/hair/face/body, edit paths to match your photos, re-rig. |
| B. You draw in Figma/Procreate from your photos | High | Your time | I clean, optimise, rig, and animate. A Figma MCP is connected, so I can read the file directly. |
| C. Commission an illustrator | Highest | € | Give them the rig spec in §5.2 so the output is animatable. |
| D. I hand-author SVG paths from your photos | Medium–low | Low | Fine for doodles and simple poses. Honestly weaker for facial likeness. |

The plan: start with A to get the full site moving, and leave room to swap in B or C later. The rig spec below stays the same, so swapping is a drop-in replacement.

### 5.2 Rig spec (what makes it animatable)
- One `viewBox` per pose, with a consistent stroke width (`2.5`), `stroke-linecap/linejoin: round`, and `vector-effect: non-scaling-stroke`.
- **Colours come only from CSS vars** (`--peep-line`, `--peep-fill`, `--peep-shade`, `--brand`), so the illustrations switch with the theme automatically.
- Named groups with transform origins:
  `#peep > #body > (#torso, #arm-l, #arm-r, #legs) , #head > (#hair, #face > (#eye-l, #eye-r, #brows, #mouth), #accessories)`
- Parts are modular React components, like Open Peeps' own system:
  `<Peep pose="laptop" face="smile" hair="yours" accessory="glasses" />`
- Pipeline: SVG → **SVGO** (keep IDs and viewBox) → typed TSX components. Poses outside the hero are lazy-loaded with `next/dynamic`.

### 5.3 Poses and expressions

| Pose | Used in |
|---|---|
| Laptop (sitting) | Home hero |
| Waving | Mobile menu, Contact intro |
| Thinking (hand on chin) | About story |
| Holding sign | Home CTA |
| Envelope | Contact |
| Lost with map | 404 |
| Reading/coffee | Preloader + "Currently" |
| Thumbs-up mini | Toasts |

Expressions: `smile · grin · blink · surprised · focused`.

### 5.4 Animations
1. **Draw-in:** `pathLength` 0 → 1, staggered by group, then fills fade in at 40%. Runs when the illustration enters view.
2. **Line boil (the hand-drawn wobble):** an SVG filter (`feTurbulence` + `feDisplacementMap`, scale ≈ 1.5) whose `seed` changes in steps at 8–10 fps, so lines jitter like a cartoon. It pauses off-screen and turns off with reduced motion.
3. **Idle breathing:** torso `scaleY 1 → 1.015` on a 4s loop.
4. **Blink:** eyes `scaleY → 0.1` at random 2–6s intervals, with an occasional double-blink.
5. **Look-at:** head rotates up to ±6° and pupils move up to ±2px toward the cursor, using `spring.soft`.
6. **Wave:** arm rotation keyframes on hover or when entering a page.
7. **Theme reaction:** when you switch to dark mode, the peep briefly squints and a tiny hand-drawn moon pops in.
8. **Pose changes** cross-fade with a quick redraw. We don't morph between paths because point counts differ.

### 5.5 Doodle library (`<Doodle name variant draw="inView|hover|mount" />`)
underline-scribble · circle-scribble · double-underline · arrow-curvy · arrow-loop · arrow-down · star · sparkle · squiggle-divider · cross-out · check · bracket · speech-bubble · highlighter-swipe · heart · signature (your name/initials, used for the logo and preloader).
Doodles are `aria-hidden` and coloured with `currentColor` or `--brand`.

---

## 6. Loading screen (full page load and refresh only)

**Behaviour**
- Rendered by the server inside the root layout, so it covers the page **before** JavaScript loads. No flash of content.
- It only plays on a full page load. Client-side navigation never remounts the root layout, so it won't replay there; those navigations use the page transition instead (§7).
- Progress is tied to real readiness: `document.fonts.ready`, the hero image decoding, and `window.load`. The counter eases toward 90 while loading, then finishes. It shows for **at least 1.2s and at most 4s**.

**Sequence (~2s)**
1. Screen in `--background` (the correct theme is already applied by next-themes' inline script).
2. Your **signature or peep head draws itself** while a mono counter `000 → 100` ticks in the corner, with a tagline in the current locale ("Sketching things…", "Je dessine…").
3. At 100 the peep winks and a brand dot pops.
4. **Exit:** the panel slides up (`ease.inOut`, 0.8s) with a curved bottom edge that flattens as it moves. This hands off to the hero intro through an `IntroContext` (`introDone`), so the hero waits for the preloader.

**Details**
- Page scrolling is locked and `<main inert>` is set while it shows. It has `role="status"` and a localised "Loading" label.
- `<noscript>` hides it.
- Reduced motion: a static signature and a 200ms fade.
- ❓ Shorter version (~0.8s) after the first visit in a session? Default: **yes**.

---

## 7. Page transitions

App Router layouts persist between pages, so a plain `AnimatePresence` can't animate a page out. The plan:

1. **`TransitionLink` + `TransitionProvider`:** a click prefetches the route and runs the **curtain in** (a neutral-900 panel with a hand-drawn edge, showing the destination page name in display serif with a small doodle, 0.5s). Then `router.push()`, and when the `pathname` changes the **curtain goes out** (0.5s).
2. **`template.tsx`** runs the enter animation for each page (staggered header → content).
3. **Back/forward** (browser history) skips the curtain and only runs the enter animation, so history feels instant.
4. **Theme toggle** uses the View Transitions API (`document.startViewTransition`) for a **circular reveal from the toggle button**. Browsers without support just switch instantly.
5. Alternative to note: React's `<ViewTransition>` plus Next's experimental flag. It's less code but gives less control and is still experimental. Not the default.

**Other motion pieces:** `SplitText` (mask reveals by line or word), `Reveal` (fade/translate when in view), `Magnetic`, `Marquee`, `ScrollProgress`, `CountUp`, `ParallaxImage`, `ScrubText` (gray → neutral as you scroll).

---

## 8. Internationalisation (next-intl)

- `src/i18n/routing.ts`: `locales`, `defaultLocale: 'en'`, `localePrefix: 'as-needed'` (English has no prefix, e.g. `/about`; other languages do, e.g. `/fr/about`).
- ❓ Localised slugs (`/fr/a-propos`)? Default: **no**. Simpler, and links survive language switches.
- `proxy.ts` detects the language from the cookie, then `Accept-Language`, then falls back to the default.
- `app/[locale]/layout.tsx`: `setRequestLocale`, `generateStaticParams` for every locale, `<html lang dir>`, `NextIntlClientProvider`.
- `messages/{en,fr,yo}.json`, namespaced by page (`Home.hero.title`…). Message keys are type-checked through a `global.d.ts` augmentation, so a missing key is a type error.
- MDX case studies per locale fall back to `en` with a small "Not yet translated" badge.
- Dates and numbers use `useFormatter` (the counters and timeline years).
- `hreflang` alternates in metadata and the sitemap. The locale switcher keeps you on the same page and preserves scroll position.
- If an RTL language is ever added: the layout already uses logical properties (`ms-`, `pe-`, `start-`).

---

## 9. Dark / light mode

- next-themes: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange` (we run our own transition, §7.4).
- Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));`
- `<html suppressHydrationWarning>`. The toggle is a hand-drawn sun ↔ moon icon that morphs, plus a "System" option in the dropdown.
- Illustrations, doodles, and grain all read CSS vars, so there are no separate dark-mode assets.
- Photos stay grayscale in both modes, with brightness at 0.9 in dark mode.

---

## 10. Your photos

**What to send** (high-res, ≥ 2000px on the long edge; a plain background helps):
1. Front-facing headshot, neutral expression (illustration reference)
2. Front-facing headshot, smiling
3. 3/4 angle headshot
4. Half-body, relaxed pose (About page hero)
5. 2–3 candids: at a desk/laptop, outdoors, laughing (gallery and peep-pose reference)
6. Optional: one with glasses, hat, or any accessory you're known for

**Processing:** `next/image` with AVIF/WebP and blur placeholders. Stored in `src/assets/me/`, imported statically, and converted to grayscale with CSS (so the originals stay untouched). One photo is also used in the OG image.

---

## 11. SEO, accessibility, performance

- **Metadata** per locale and page. `opengraph-image.tsx` per page, generated with `next/og`: a monochrome card with your peep and the page title. `sitemap.ts`, `robots.ts`, and JSON-LD `Person` + `WebSite`.
- **Accessibility:** WCAG AA contrast (checked for the token table in §2.4), visible brand focus ring, skip link, keyboard-accessible menus and palette, localised `aria-label`s, illustrations with `role="img"` + `<title>`, doodles `aria-hidden`, nothing that only works on hover (touch gets tap equivalents), and reduced motion respected everywhere.
- **Performance targets:** Lighthouse ≥ 95 on all four scores, LCP < 2.0s, CLS < 0.05, first-load JS ≤ ~150KB gzipped. How: every page is statically generated, Motion is loaded through `LazyMotion`, illustrations below the fold are lazy-loaded, fonts are subset, and the boil effect pauses off-screen.

---

## 12. Project structure

```
src/
  app/
    [locale]/
      layout.tsx            # providers, header/footer, preloader, cursor, grain
      template.tsx          # per-page enter animation
      page.tsx              # Home
      about/page.tsx
      work/page.tsx
      work/[slug]/page.tsx
      work/[slug]/loading.tsx
      contact/page.tsx
      contact/actions.ts    # server action (zod + Resend)
      not-found.tsx
      opengraph-image.tsx
    globals.css             # Tailwind v4 @theme, tokens, light/dark
    sitemap.ts
    robots.ts
  components/
    ui/                     # shadcn (customised)
    layout/                 # header, footer, mobile-menu, theme-toggle, locale-switcher, command-menu
    motion/                 # split-text, reveal, magnetic, marquee, cursor, smooth-scroll, count-up, transition/
    preloader/
    illustrations/
      peep/                 # parts/, poses/, peep.tsx, use-blink.ts, use-look-at.ts
      doodles/
      filters/              # boil-filter.tsx, grain.tsx
    sections/               # home/, about/, work/, contact/
  content/work/<slug>/{en,fr,yo}.mdx
  i18n/                     # routing.ts, request.ts, navigation.ts
  lib/                      # motion.ts, utils.ts, site.ts (name, email, socials), content.ts
  hooks/
  assets/me/                # your photos
messages/{en,fr,yo}.json
proxy.ts
```

---

## 13. Build phases (each one ends in a commit you can review)

| Phase | Deliverable | You review |
|---|---|---|
| **0. Decisions** | This doc, with all ❓ answered | ✔ |
| **1. Scaffold** | Next + TS + Tailwind v4 + shadcn init + lint/format + Playwright | Runs locally |
| **2. Tokens & theme** | Colours, fonts, radius, motion tokens, grain, light/dark toggle, `/styleguide` dev page showing every token and component | **Visual sign-off on palette and type** |
| **3. i18n** | next-intl routing, message files, switcher, typed keys | Language switching works |
| **4. Shell** | Header, footer, mobile menu, `⌘K`, cursor, Lenis | Navigation feel |
| **5. Preloader + transitions** | §6 and §7 | **Motion sign-off** |
| **6. Illustration system** | Peep rig, 2 poses, doodle library, boil, draw-in | **Likeness sign-off** (needs your photos) |
| **7. Pages** | Home → About → Work + case study → Contact → 404 | Page by page |
| **8. Content & translation** | Real copy, MDX case studies, fr/yo translations | Copy review |
| **9. Polish** | SEO/OG, a11y audit, perf budget, reduced motion pass | Lighthouse report |
| **10. Ship** | Vercel deploy, domain, analytics (Vercel Analytics) | 🚀 |

---

## 14. Content I'll need from you

- [ ] Photos (§10)
- [ ] Final name display ("Toluwalope Akinkunmi"? "Tolu"?) and one-line role/tagline
- [ ] Short bio (I can draft one from your README for you to edit)
- [ ] Projects to feature, with live/repo links, screenshots, role, year, and stack (plus updated URLs for the Cyclic-hosted ones)
- [ ] Work/education history for the timeline
- [ ] Social links (GitHub `H4LV3D`, LinkedIn, X, etc.) and preferred contact email
- [ ] CV PDF (optional)
- [ ] Translations: I can draft fr/yo, but a native speaker should review the Yorùbá
