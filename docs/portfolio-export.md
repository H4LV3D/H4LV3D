# Portfolio export

Generated 2026-10-02T22:10:56+00:00 from 9 local repositories, 7 GitHub organisations and the 41 repositories under my personal GitHub account.

9 experience entries, 40 projects, 22 other repos listed briefly. Commit counts are across all local and remote branches, merge commits included, excluding stashes. For the three monorepo projects the counts are limited to that app's folder, so they overlap.

## Experience

### The Circular Net Limited

**Frontend Developer (web + mobile)** · employment · 2023-12 to present · https://www.thecircularnet.com

Frontend development across The Circular Net's product family: the sustainability-focused social network on web and mobile, the Circular Ticket events and ticketing apps, the admin dashboard, the SSO service and the marketing site. Sole or lead committer on almost every frontend repository in the organisation.

- Built the current web app (625 of 653 commits) covering feed, communities, messaging, audio/video rooms, jobs board, projects hub and podcasts
- Built the Expo/React Native mobile app (448 of 493 commits), listed on the App Store and Google Play
- Built Circular Ticket on web and mobile as a monorepo with a shared package, including ticket scanning, checkout, wallets, payouts and KYC
- Built the OAuth 2.0 single sign-on frontend used across the product family
- Built the marketing website, including blog publishing, service pages and an SEO and accessibility pass
- Built the admin dashboard, including the Circular Ticket KYC and payout review screens
- Published a shared UI component library to npm for reuse across the web apps

_Check:_ Role title and employment type are inferred, not documented in the repos. Start date is my first commit in the earlier web app repo (tbn-webapp, Dec 2023); the current repos start mid-2025.

### Law x Tech

**Web Developer** · volunteer · 2023-09 to present · https://lawxtech.org

Built and maintain the Law x Tech website, the public face of a community at the intersection of law and technology in Africa. Delivered the original React site in 2023-24 and a full Next.js redesign with an admin CMS in 2026.

- Rebuilt the site on Next.js 16 with public pages for series, summit and awards, partners, sponsors, careers and blog
- Built an admin CMS with authentication, blog management, role-based user management and image uploads
- Built the original site (156 of 237 commits) with home, about, series, blog and contact pages
- Keep series episodes, team, partners and summit content current

_Check:_ Type (volunteer vs freelance/client) and role title are guesses - nothing in the repos states them.

### Export Trades

**Frontend Developer** · client · 2025-08 to 2026-04 · https://www.exportrades.com

Frontend development for a global commodity trading platform: a multilingual marketing site plus an authenticated trading web app. Largest contributor on a five-person repository (99 of 169 commits).

- Built marketplace, commodities and market-trends pages on the public site
- Built trading workflows including requests for quote, expressions of interest, offers, escrow and disputes
- Added multi-language support, including Arabic

_Check:_ Engagement type and role title are guesses. Confirm you are happy to name this organisation.

### DS Energy Ltd

**Frontend Developer** · client · 2025-08 to 2025-11

Built the frontend of a sales portal for managing the marketers and customers of a solar and inverter provider. Sole frontend committer (84 of 84 commits).

- Built sales, customers, commissions and procurement-list modules
- Built multi-step onboarding with document upload and account-status handling
- Built sale details and invoices with PDF export and payment links

_Check:_ Engagement type and role title are guesses. No production URL found in the repo.

### Pennywise

**Frontend & Mobile Developer** · client · 2024-01 to 2025-05 · https://www.iampennywise.com

Built the Pennywise personal-finance mobile app and its marketing website. Sole committer on the mobile app (132 of 132 commits) and near-sole on the website (199 of 201).

- Built the Expo/React Native app: auth, onboarding, wallets, budgets and charts
- Built the marketing site with waitlist, pricing, contact, community and blog pages
- Rebuilt the landing page in a later Next.js + Tailwind version

_Check:_ Engagement type and role title are guesses. I did not check whether the site is still live.

### Hotrac (FarmShare)

**Frontend Developer** · client · 2023-10 to 2023-11

Built the administrator's dashboard for FarmShare, a tractor and farm-equipment sharing product. Authored 165 of 166 commits over about a month.

- Built users, tractors, bookings, transactions and payment-request screens
- Built per-user and per-tractor detail pages with maps and charts

_Check:_ Organisation name is taken from the GitHub org slug (hotrac-org); the product name FarmShare is from the README. Engagement type is a guess.

### StellarMaxi (Tonmax)

**Frontend Developer** · freelance · 2024-07 to 2024-07

Built the UI of a Telegram mini app for a crypto referral platform. Only 2 commits (project initialisation and fixes), both mine.

- Built dashboard, referral, level, mining, transactions and withdrawal screens

_Check:_ Very small footprint (2 commits). Decide whether it belongs in the portfolio at all.

### Gemspay Solutions Limited

**Frontend Developer** · client · 2024-05 to 2025-06

Built the marketing website for a payments company across two versions. Sole committer on the website repository (28 of 28 commits).

- Built product, pricing, blog and support pages
- Built demo-request, contact and newsletter forms
- Delivered a second landing-page version in mid-2025

_Check:_ Engagement type and role title are guesses. A Flutter app for the same company also sits in your account (see otherRepos) but looks imported rather than written by you.

### Independent projects

**Full-stack / Frontend Developer** · freelance · 2022-04 to 2026-07

Self-directed products and small client websites built outside any organisation, from early full-stack JavaScript apps to recent Next.js and NestJS builds.

- Built Invocipt, an invoicing and receipts SaaS, to a tagged 1.0.1 release (595 commits)
- Built Tosin Farms, a full-stack e-commerce platform with a NestJS API and passkey login
- Built TrendHub, a content hub for newsletters, podcasts and blogs
- Built websites for a hospital, a branding consultancy, an architecture studio and a clothing brand
- Built admin dashboards for event ticketing, trading and a small retail business
- Built a Python stock-analysis bot deployed to AWS Lambda

_Check:_ This groups personal builds and what look like client jobs. I could not tell which were paid, so each project's type (personal vs freelance) is a guess for you to correct.

## Projects

### Circular Ticket (mobile app)

_Event discovery and ticketing app_

| | |
|---|---|
| Slug | `circular-ticket-mobile` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | mobile |
| Visibility | private |
| Role | Frontend Developer (mobile, sole committer) |
| Period | 2026-07 to present |
| Commits | 162 mine of 162 |
| Source | events-workspace/apps/events-mobile (local monorepo) |
| Areas touched | src/modules, src/app, src/components, src/lib, ios, android |
| Needs review | yes |

**Stack:** Expo 57, React Native 0.86, Expo Router, TypeScript, NativeWind (Tailwind), TanStack Query, Redux Toolkit, React Hook Form, Zod, Reanimated, expo-camera, react-native-maps, expo-notifications, EAS Build

**Summary.** iOS and Android app for Circular Ticket, the events and ticketing product from The Circular Net. Attendees discover events and buy tickets; organisers create events, track orders and get paid.

**Problem.** Organisers and attendees needed a native app for the events product, with one account switching between attendee and creator roles.

**Process.** Built the app in an npm-workspaces monorepo alongside the web app, sharing services, hooks and schemas through a common package. Started from mock data and UI primitives, then wired each area (events, orders, wallets, payouts, KYC, scanning) to the real API.

**Outcome.** App identity, deep links and EAS builds for Play Console are configured in the repo. No store listing is recorded yet.

**Learnings.** Sharing data and validation logic between web and mobile kept the two apps consistent while screens stayed platform-specific.

**What I built**

- [mobile] Built the attendee flow: discover and filter events, event details, registration, checkout and orders with QR tickets
- [mobile] Built the creator flow: multi-step create/edit event wizard, dashboard stats, orders and scanner access
- [mobile] Built the ticket scanner: camera framing that locks onto the code, validation and attendee check-in
- [mobile] Built multi-currency (NGN/USD) wallets, transactions, payout accounts and payout requests
- [mobile] Built the 5-step KYC wizard and in-review states on payout screens
- [mobile] Built SSO-only sign-in with a local onboarding gate, location selection and notification opt-in
- [mobile] Added device calendar sync, a notifications hub, dark mode, pull-to-refresh and illustrated empty states
- [mobile] Added iPad rotation support and adopted the iOS scene lifecycle so the app launches on the newest iOS

**Links**

- Live: https://circularticket.com (confirmed)

**Visuals**

- `events-workspace/apps/events-mobile/assets/images/icon.png`
- `events-workspace/apps/events-mobile/assets/images/adaptive-icon.png`
- `events-workspace/apps/events-mobile/assets/icon-light.png`
- `events-workspace/apps/events-mobile/assets/images/logo.png`
- `events-workspace/apps/events-mobile/assets/images/auth/mascot-welcome.png`
- `events-workspace/apps/events-mobile/assets/illustrations/celebration.png`

_Notes:_ The live link is the web app's domain, not a store listing - I found no App Store or Play Store URL for Circular Ticket. Commit counts for the three monorepo projects overlap, because one commit often touches several apps (the whole monorepo is 226 commits, all mine). No app screenshots exist in the repo, only icons and illustrations.

### Circular Ticket (web app)

_Create, sell and scan event tickets_

| | |
|---|---|
| Slug | `circular-ticket-web` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (web, sole committer) |
| Period | 2026-03 to present |
| Commits | 89 mine of 89 |
| Source | events-workspace/apps/events-frontend (local monorepo) + earlier standalone repo TheBaseNet/events-frontend (198 of 198 commits, Mar-Sep 2026) |
| Areas touched | src/modules, src/app, src/components |
| Needs review | yes |

**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui + Base UI, TanStack Query, TanStack Table, Redux Toolkit, React Hook Form, Zod / Yup, Recharts, qr-scanner, Databuddy analytics

**Summary.** Web app for Circular Ticket: a public events site plus an organiser dashboard for creating events, selling tickets, checking attendees in and requesting payouts.

**Problem.** Organisers needed one place to publish events, manage ticket types and orders, verify their identity and get paid in NGN or USD.

**Process.** Built the app as a standalone Next.js project, then moved it into a monorepo with the mobile app and extracted shared services and hooks. Built each module (events, orders, wallet, payouts, KYC, scan) and wired it to the live API, including Stripe and bank payout flows.

**Outcome.** Runs on the production domain referenced by the marketing site. Three written audits of architecture, monorepo correctness and web/mobile sharing are kept in the repo's docs folder.

**Learnings.** Separating loading, error, filtered-empty and truly-empty states made data-heavy dashboard screens much clearer.

**What I built**

- [web] Built the public home page, event listing and event detail pages with SEO metadata, sitemap and OG image
- [web] Built the event create/edit flow with schedules, ticket types, speakers and hybrid/virtual venues
- [web] Built organiser orders, order detail and registration stats, with spreadsheet export
- [web] Built the browser ticket scanner, scanner hub and staff scanner-access pages
- [web] Built wallets with an NGN/USD toggle, transactions, payout accounts and payout requests, including the return from Stripe onboarding
- [web] Built the KYC form and Payouts & Verification settings
- [web] Added dark mode that follows the system theme, plus new branding, favicon and app icons

**Links**

- Live: https://circularticket.com (confirmed)

**Visuals**

- `events-workspace/apps/events-frontend/public/og-image.png`
- `events-workspace/apps/events-frontend/public/icon.png`
- `events-workspace/apps/events-frontend/public/images/hero/image-1.jpg`
- `events-workspace/apps/events-frontend/public/images/celebrate.png`

_Notes:_ Commit count is for the monorepo path only; the earlier standalone repo adds 198 more, with some history duplicated when it was synced into the monorepo. The domain comes from the marketing site's example environment file; I did not open it to check it is live. Hero images may be stock photography - check licensing before reuse.

### Circular Ticket shared package

_Shared logic for web and mobile_

| | |
|---|---|
| Slug | `circular-ticket-shared` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web, mobile |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2026-07 to 2026-09 |
| Commits | 61 mine of 61 |
| Source | events-workspace/packages/shared (local monorepo) |
| Areas touched | src/services, src/hooks, src/utils, src/constants, src/store, src/config, src/schemas |
| Needs review | no |

**Stack:** TypeScript, npm workspaces, TanStack Query, Axios, Redux Toolkit, Redux Persist, Zod / Yup, React Hook Form, Day.js

**Summary.** Internal package holding the API services, query hooks, validation schemas, store and constants used by both Circular Ticket apps.

**Problem.** The web and mobile apps were duplicating API calls, formatting and business rules, and drifting apart.

**Process.** Set up the monorepo with npm workspaces and moved cross-platform logic into one package. Centralised currency formatting, order status mapping, scanner verification and the auth-failure check, guided by written audits.

**Outcome.** Both apps import the same services, hooks and rules, such as the single rule for when a payout can be requested.

**Learnings.** Shared code needs aligned dependency versions and careful handling of hoisting across web and native.

**What I built**

- [shared] Set up the monorepo structure and consolidated lockfiles and dependency versions
- [shared] Centralised API services and TanStack Query hooks for events, orders, wallets, payouts and KYC
- [shared] Centralised currency formatting, status mapping and status badge colours
- [shared] Centralised scanner verification and the transport for staff scan tokens
- [shared] Shared one privacy policy and one payout-eligibility rule between web and mobile

**Links**

- None found

_Notes:_ Internal package, not published. Listed separately because you asked for each packages/* entry as its own project; you may prefer to fold it into the two app entries.

### The Circular Net (web app)

_Social network for sustainability_

| | |
|---|---|
| Slug | `the-circular-net-web` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (web, lead committer) |
| Period | 2025-06 to present |
| Commits | 625 mine of 653 |
| Source | tcn-webapp (local) |
| Areas touched | src/app/(authenticated), src/components/shared, src/components/ui, src/utils, src/packages/post, src/contexts, src/app/(auth), src/components/call |
| Needs review | no |

**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Radix UI / shadcn, TanStack Query, Redux Toolkit, Stream Video SDK, Stream Chat, Pusher, TipTap, React Hook Form, Zod / Yup, Paystack, WaveSurfer, Databuddy analytics

**Summary.** A platform combining environmental advocacy with social networking, connecting individuals, organisations and businesses around sustainability and climate solutions.

**Problem.** People and organisations working on sustainability needed one place to share, organise, hire and meet, rather than a general-purpose social network.

**Process.** Rebuilt the web app on the Next.js App Router with a module per product area. Built real-time chat and live audio/video rooms on Stream and Pusher, a rich-text post composer, and infinite-scrolling feeds across the app.

**Outcome.** Runs on the production app domain, with deep links into the mobile app and a download page pointing to both stores.

**Learnings.** Live rooms need careful state handling around device setup, screen share and participants leaving or being removed.

**What I built**

- [web] Built the feed and posts: composer with media, scheduling, editing, comments, hashtags, saved posts and impression tracking
- [web] Built communities, discover people, business pages and profiles with a multi-step complete-profile flow
- [web] Built messaging: direct and group chat, pasted images, media previews and rooms attached to chats
- [web] Built audio and video rooms: host controls, moderation, raise hand, emoji reactions, screen share, recording UI and picture-in-picture
- [web] Built the jobs board, projects hub with milestones, podcasts with an audio player, and events
- [web] Built notifications, settings (including delete account and data) and a new-user walkthrough tour
- [web] Built guest pages for communities, events and jobs, plus link previews and SEO metadata

**Links**

- Live: https://app.thecircularnet.com (confirmed)

**Visuals**

- `tcn-webapp/public/icon.png`
- `tcn-webapp/public/adaptive-icon.png`

_Notes:_ One other contributor and one automated commit account for the remaining 28 commits. No screenshots in the repo; the marketing site's feature images (listed under that project) show the product.

### The Circular Net (mobile app)

_Sustainability social network, in your pocket_

| | |
|---|---|
| Slug | `the-circular-net-mobile` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | mobile |
| Visibility | private |
| Role | Frontend Developer (mobile, lead committer) |
| Period | 2025-07 to present |
| Commits | 448 mine of 493 |
| Source | tcn-mobileapp (local) |
| Areas touched | src/modules/authenticated, src/utils, src/components/shared, src/modules/auth, src/modules/complete-profile, src/lib/toast, src/components/ui, src/contexts |
| Needs review | no |

**Stack:** Expo 53, React Native 0.79, Expo Router, TypeScript, NativeWind (Tailwind), TanStack Query, Redux Toolkit, Stream Video SDK, Stream Chat, Pusher, Notifee, react-native-track-player, Gorhom Bottom Sheet, Reanimated, EAS Build + Updates

**Summary.** The iOS and Android app for The Circular Net: feed, communities, messaging, live audio and video rooms, jobs, projects and podcasts for a sustainability-focused community.

**Problem.** The community needed the full platform on mobile, including real-time chat, calls and background audio, not just a wrapped website.

**Process.** Built the app with Expo and expo-router, organised by feature module. Added Stream-based rooms and calls, a Pusher-backed chat store, a background podcast player and an iOS share extension, with separate development, staging and production variants.

**Outcome.** Listed on the App Store and Google Play. The app config records version 1.3.1.

**Learnings.** Explicit environment variants that fail loudly prevent builds from silently pointing at the wrong backend.

**What I built**

- [mobile] Built auth and onboarding: email and Google sign-in, password strength rules and a multi-step complete-profile flow
- [mobile] Built the feed and post creation with media, scheduling, hashtag autocomplete and fullscreen media gestures
- [mobile] Built messaging with media-aware previews, document preview and download, and 1:1 calling with ring detection
- [mobile] Built audio and video rooms with reactions, raise hand, host actions, picture-in-picture and background audio
- [mobile] Built a podcast player with mini and full players, queue, resume position and background playback
- [mobile] Built communities, explore, jobs board, project hubs, business pages and saved posts
- [mobile] Added deep linking, push notifications, token refresh and an iOS share extension

**Links**

- Live: https://www.thecircularnet.com (confirmed)
- App Store: https://apps.apple.com/app/the-circular-net/id6747455234 (confirmed)
- Play Store: https://play.google.com/store/apps/details?id=com.thecircularnet.mobile (confirmed)

**Visuals**

- `tcn-mobileapp/assets/images/icon.png`
- `tcn-mobileapp/assets/images/adaptive-icon.png`
- `tcn-mobileapp/assets/images/splash-icon.png`
- `tcn-mobileapp/assets/images/logo.png`

_Notes:_ One other contributor authored the remaining 45 commits (Jan-Feb 2026), including Apple sign-in and biometric login, so those are not listed as yours. Store links come from the web app and marketing site source; I did not open them. No store screenshots in the repo.

### The Circular Net Admin Dashboard

_Back-office for the platform_

| | |
|---|---|
| Slug | `tcn-admin-dashboard` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2024-06 to present |
| Commits | 51 mine of 51 |
| Source | tcn-admin-webapp (local) |
| Areas touched | src/utils, src/components, src/app, src/store, src/hooks |
| Needs review | yes |

**Stack:** Next.js 13 (App Router), React 18, TypeScript, Tailwind CSS, Mantine, Radix UI, TanStack Query, TanStack Table, Redux Toolkit, Zustand, FullCalendar, React Hook Form, Yup, Docker

**Summary.** Internal admin web app for managing The Circular Net: users, content, communities, jobs, projects and events, plus review tools for Circular Ticket.

**Problem.** Staff needed to manage users and content, and to review organiser identity checks and payouts, without touching the database.

**Process.** Built the dashboard shell, auth and data tables first, then added an app switcher so one admin can move between products. Most recently added the Circular Ticket section for KYC and payout review.

**Outcome.** Used as the internal admin tool; no public metrics are recorded in the repo.

**Learnings.** A shared app picker and layout let one admin codebase serve several products.

**What I built**

- [web] Built admin login, password reset and the dashboard layout with stats
- [web] Built user management with paginated, searchable and sortable tables
- [web] Built sections for communities, content moderation, job board, projects and an event calendar
- [web] Built the Circular Ticket admin area: KYC review with an image viewer and payout review
- [web] Built app-switcher dropdowns, admin profile pages and per-app loaders

**Links**

- None found

**Visuals**

- `tcn-admin-webapp/public/circular-ticket-logo-white.png`

_Notes:_ Only a staging address appears in the repo, so I left the live link empty (internal hostname). The dashboard also has a section for a second in-house app called Zola - I could not tell whether that name is public, so check before mentioning it.

### The Circular Net SSO

_One sign-in for every app_

| | |
|---|---|
| Slug | `tcn-sso` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2025-12 to 2026-07 |
| Commits | 42 mine of 42 |
| Source | sso-frontend (local) |
| Areas touched | src/utils, src/app, src/components, src/styles, src/contexts |
| Needs review | no |

**Stack:** Next.js 16 (App Router), React 19, React Compiler, TypeScript, Tailwind CSS 4, Radix UI, TanStack Query, Redux Toolkit, React Hook Form, Yup, Google OAuth, Sign in with Apple, Motion

**Summary.** Dedicated single sign-on frontend that handles login, sign-up and account recovery for The Circular Net's apps using OAuth 2.0.

**Problem.** Each product had its own login; users needed one account and one secure sign-in across the web app, events app and marketing site.

**Process.** Built the OAuth 2.0 authorisation flow with client validation and safe redirect handling. Added email/password, Google and Apple sign-in, OTP email verification and password reset, with animated multi-step forms.

**Outcome.** Runs on the accounts domain and is the sign-in entry point used by the marketing site, the web app and Circular Ticket.

**Learnings.** Redirect and client validation must be strict, because the SSO page is the one place every app trusts.

**What I built**

- [web] Built the OAuth 2.0 authorise flow with client ID validation and redirect handling
- [web] Built email/password sign-in and sign-up with OTP email verification
- [web] Added Google and Apple sign-in with provider callback handling
- [web] Built password reset with live strength validation and confirm-password checks
- [web] Added animated multi-step forms, light/dark themes and a post-auth redirect page

**Links**

- Live: https://accounts.thecircularnet.com (confirmed)

**Visuals**

- `sso-frontend/public/icon.png`

_Notes:_ The domain comes from the marketing site's example environment file. The README says PKCE is supported; I did not verify that in code.

### The Circular Net website

_Marketing site and sustainability insights_

| | |
|---|---|
| Slug | `thecircularnet-website` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2026-06 to present |
| Commits | 62 mine of 62 |
| Source | thecircularnet-website (local) |
| Areas touched | src/modules, src/constants, src/app, src/components, src/utils |
| Needs review | no |

**Stack:** Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, shadcn/ui + Radix UI, React Hook Form, Yup, Motion, Lenis, Swiper, Databuddy analytics

**Summary.** Public marketing website for The Circular Net, presenting the platform, its sustainability services and a blog of thought-leadership articles.

**Problem.** The company needed a site that explains the product and its services, ranks in search and routes visitors into the apps.

**Process.** Built the home page and service pages as feature modules, then added a blog with a password-gated writing page. Followed with an SEO, web-vitals and accessibility pass, and redirects for old indexed links.

**Outcome.** Live on the company's main domain, with SSO sign-in that hands users over to the web app.

**Learnings.** Server-side secrets behave differently per host; the blog admin needed specific handling for the hosting platform's SSR.

**What I built**

- [web] Built the home page with feature showcases and live upcoming events from the API
- [web] Built Carbon Accounting, ESG Reporting & Compliance and Sustainability Projects pages
- [web] Built the blog listing and article pages, with a white paper download and share actions
- [web] Built a password-gated admin page for publishing blog posts
- [web] Rebuilt the contact form with validation, plus legal, account-deletion and 404 pages
- [web] Delivered an SEO overhaul: metadata, sitemap, generated OG images, redirects and accessibility fixes
- [web] Added SSO sign-in with CSRF state validation and analytics

**Links**

- Live: https://www.thecircularnet.com (confirmed)

**Visuals**

- `thecircularnet-website/public/features/feature-communities.png`
- `thecircularnet-website/public/features/feature-audio-rooms.png`
- `thecircularnet-website/public/features/feature-video-rooms.png`
- `thecircularnet-website/public/features/feature-events.png`
- `thecircularnet-website/public/features/feature-jobs.png`
- `thecircularnet-website/public/features/feature-podcasts.png`
- `thecircularnet-website/public/features/feature-projects.png`
- `thecircularnet-website/public/images/hero-image.jpg`
- `thecircularnet-website/public/images/hero-esg.png`
- `thecircularnet-website/public/icon.png`

_Notes:_ The feature-*.png images look like the best existing product visuals for the TCN web and mobile entries too.

### @thebasenet/ui

_Shared React UI component library_

| | |
|---|---|
| Slug | `thebasenet-ui` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | public |
| Role | Frontend Developer (author) |
| Period | unknown (no git history) |
| Commits | 0 mine of 0 |
| Source | tcn-ui (local folder, git initialised but no commits) |
| Areas touched | src/ui, src/components, src/brand, src/tokens, styles |
| Needs review | yes |

**Stack:** React, TypeScript, Radix UI, Tailwind CSS, class-variance-authority, tsup, cmdk, Vaul, Sonner, React Hook Form

**Summary.** The Circular Net's shared UI component library: design tokens, brand assets and about 37 UI primitives used by the web apps.

**Problem.** Several Next.js apps were re-implementing the same buttons, dialogs, forms and brand components.

**Process.** Extracted the common components into one package with separate entry points for UI, components, brand, tokens and styles, bundled with tsup.

**Outcome.** Published on the public npm registry at version 0.1.9 and used by the marketing site and the Circular Ticket web app.

**Learnings.** Splitting entry points lets apps import only what they need from a shared library.

**What I built**

- [web] Built UI primitives including button, dialog, drawer, select, combobox, calendar, date-time picker, tabs and form
- [web] Built shared components: empty, error and loading states, page loader, custom modal, country selector and theme switcher
- [web] Packaged brand logos, colour, radius and typography tokens, and shared stylesheets
- [web] Set up the tsup build and npm publishing

**Links**

- Live: https://www.npmjs.com/package/@thebasenet/ui (confirmed)

_Notes:_ No git history exists locally and the GitHub repo named in package.json was not reachable, so I have no dates or commit counts and cannot prove authorship from history. Fill in the period yourself. Visibility is 'public' because the package is on public npm; the source repo is not public.

### network-requests-ui

_Drop-in network debug panel_

| | |
|---|---|
| Slug | `network-requests-ui` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web |
| Visibility | private |
| Role | Author |
| Period | 2026-07 to 2026-07 |
| Commits | 2 mine of 2 |
| Source | network-requests-ui (local, no remote) |
| Areas touched | src |
| Needs review | yes |

**Stack:** TypeScript, React, tsup, Axios interceptors

**Summary.** A drop-in request logger and floating debug panel for axios-based React apps, for diagnosing requests on devices where devtools can't be attached, such as in-app browsers.

**Problem.** Bugs that only appear inside in-app browsers are hard to diagnose because there is no network tab.

**Process.** Wrote a logger that attaches to any axios instance through interceptors, with a real detach, and a presentational panel with inline styles and no CSS dependency. Sensitive fields are redacted from captured request bodies by default.

**Outcome.** Used in the SSO frontend's login page as a debug panel. Not published to npm as of this export.

**Learnings.** Keeping capture and display separate gives the host app control over when logging starts and stops.

**What I built**

- [web] Built createRequestLogger with attach, detach, subscribe and clear
- [web] Built a floating, expandable panel showing request body, response, errors and duration
- [web] Added default redaction of password and token fields
- [web] Kept it dependency-free apart from React, with no Tailwind or CSS requirement

**Links**

- None found

_Notes:_ No git remote and not on npm, so I marked it private and personal. If you built it as part of your Circular Net work, change the type and organisation. package.json is set up for public MIT publishing.

### The Circular Net web app (first version)

_Original platform web app_

| | |
|---|---|
| Slug | `the-circular-net-web-v1` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2023-12 to 2025-03 |
| Commits | 1379 mine of 1379 |
| Source | GitHub: TheBaseNet/tbn-webapp (staging branch; cloned to a temp folder) |
| Areas touched | src/components, src/layouts, src/pages, src/utils, src/store |
| Needs review | yes |

**Stack:** Next.js (Pages Router), React, TypeScript, Mantine, Tailwind CSS, Redux Toolkit, TanStack Query, Stream Video SDK, Pusher, TipTap, WaveSurfer, Sentry, React Hook Form, Yup

**Summary.** The first version of The Circular Net's web app, later replaced by the current App Router rebuild.

**Problem.** The platform needed its first working web product covering profiles, posts, messaging and jobs.

**Process.** Built the app on the Next.js Pages Router with Mantine and Redux, from auth and multi-step profile completion through to posts, messaging, jobs and audio rooms.

**Outcome.** Superseded by the current web app in mid-2025; no metrics are recorded in the repo.

**Learnings.** The rebuild moved to the App Router and a module-per-feature layout after this version grew large.

**What I built**

- [web] Built auth and a multi-step complete-profile flow
- [web] Built posts with a rich-text editor, visibility options and media
- [web] Built messaging, notifications and following
- [web] Built job listing and job creation pages
- [web] Built early audio rooms and events editing

**Links**

- None found

_Notes:_ The count is across all branches and includes many small commits. You may want to merge this into the current web app entry as its history rather than show it separately.

### The Circular Net mobile app (earlier build)

_Earlier React Native app_

| | |
|---|---|
| Slug | `tcn-mobile-legacy` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | mobile |
| Visibility | private |
| Role | Contributor |
| Period | 2025-02 to 2025-05 |
| Commits | 3 mine of 48 |
| Source | GitHub: TheBaseNet/TCN_mobile (cloned to a temp folder) |
| Areas touched | Screens/Private, Utils, Navigation |
| Needs review | yes |

**Stack:** React Native (bare), React Navigation, NativeWind, Redux Toolkit, TanStack Query, Stream Video SDK, Pusher

**Summary.** An earlier bare React Native build of The Circular Net app, led by other developers before the current Expo app.

**Problem.** The mobile app needed feed and navigation improvements while the team evaluated its mobile approach.

**Process.** Contributed a small set of changes: refactored the Home and Spaces screens, updated feed fetching and added Tailwind configuration.

**Outcome.** Replaced by the current Expo app in July 2025.

**Learnings.** Minor contribution; context for why the app was rebuilt with Expo.

**What I built**

- [mobile] Refactored Home and Spaces screens and feed fetching
- [mobile] Added Tailwind (NativeWind) configuration and tab navigation animation tweaks

**Links**

- None found

_Notes:_ Only 3 commits are yours. 18 commits by 'Tolu Wade' were NOT counted as you (see Identities). Probably not worth a portfolio entry on its own.

### The Circular Net waitlist

_Pre-launch waitlist sign-up page_

| | |
|---|---|
| Slug | `tcn-waitlist` |
| Organisation | The Circular Net Limited |
| Type | employment |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2025-08 to 2025-09 |
| Commits | 17 mine of 17 |
| Source | GitHub: TheBaseNet/waitlist-frontend (cloned to a temp folder) |
| Areas touched | src/components, src/app, src/utils |
| Needs review | no |

**Stack:** Next.js, React, TypeScript, Tailwind CSS, Radix UI, TanStack Query, React Hook Form, Yup / Zod, Motion

**Summary.** A small waitlist site that collects sign-ups ahead of launch.

**Problem.** The team needed to capture interested users before the apps were publicly available.

**Process.** Built a responsive waitlist form with a country selector and phone number input with validation and country code mapping.

**Outcome.** No sign-up numbers are recorded in the repo.

**Learnings.** Small, focused build.

**What I built**

- [web] Built the waitlist form with validation
- [web] Built a country selection dialog and phone number input with country codes
- [web] Built the responsive header and footer

**Links**

- Live: https://waitlist-frontend-ruby.vercel.app (guess)

_Notes:_ The link is the preview-style address set as the GitHub repo homepage, so it may not be the production URL or still be up.

### Law x Tech website (2026 redesign)

_Africa's home for law and technology_

| | |
|---|---|
| Slug | `lawxtech-website` |
| Organisation | Law x Tech |
| Type | volunteer |
| Categories | web, fullstack |
| Visibility | public |
| Role | Full-stack Web Developer (sole developer) |
| Period | 2026-05 to present |
| Commits | 93 mine of 96 |
| Source | lawxtech-website (local) |
| Areas touched | components/home, app/admin, components/ui, components/admin, components/about, components/summit, components/series, lib/data |
| Needs review | yes |

**Stack:** Next.js 16 (App Router), React 19, React Compiler, TypeScript, Tailwind CSS 4, shadcn/ui + Base UI, Auth.js (NextAuth), Neon Postgres, Vercel Blob, TipTap, Zod, Framer Motion, Embla Carousel, Vercel Analytics, Databuddy analytics

**Summary.** Redesigned website for Law x Tech, a platform at the intersection of law and technology that runs events, training and recognition for lawyers in legal tech across Nigeria and beyond.

**Problem.** The organisation needed a modern site it could update itself, covering its series, summit and awards, partners and blog.

**Process.** Rebuilt the site on Next.js 16 with a component library and motion, then added an admin CMS backed by Postgres with credential login, a rich-text blog editor, image uploads and role-based user management. Features such as the partners section were written up as a design spec and plan before building.

**Outcome.** Live on the organisation's domain. The home page it serves reports a community of 2,000+ members.

**Learnings.** Serverless database drivers need care around connection pooling and build-time access.

**What I built**

- [web] Built the home page with hero, animated stats, series preview, speakers carousel and community sections
- [web] Built About, Series, Summit & Awards, Careers, Contact and Sponsors pages
- [web] Built the partners section with detail pages and a summit countdown
- [web] Built the blog with listing and article pages
- [backend] Built the admin CMS: login, blog create/edit with a rich-text editor and image uploads
- [backend] Built user management with add, remove and promote actions and admin-only access
- [web] Added a branded 404 page, SEO metadata and analytics

**Links**

- Live: https://lawxtech.org (confirmed)
- Code: https://github.com/LawxTech/lawxtech-website (confirmed)

**Metrics (as written in the repo)**

- 2,000+ community members - source: lawxtech-website/components/home/StatsStrip.tsx (figure shown on the home page)
- 8 major series - source: lawxtech-website/components/home/StatsStrip.tsx
- 5 mini series - source: lawxtech-website/components/home/StatsStrip.tsx

**Visuals**

- `lawxtech-website/public/images/hero-image.jpeg`
- `lawxtech-website/public/assets/logo/logo.JPG`
- `lawxtech-website/public/assets/logo/logo_2.JPG`

_Notes:_ The metrics are the organisation's own community figures hard-coded on the home page, not results of your work - use them as context only. The 3 commits not counted are merges made from the Law x Tech org account. Project type (volunteer) is a guess.

### Law x Tech website (original)

_First Law x Tech website_

| | |
|---|---|
| Slug | `lawxtech-website-v1` |
| Organisation | Law x Tech |
| Type | volunteer |
| Categories | web |
| Visibility | public |
| Role | Frontend Developer (lead committer) |
| Period | 2023-09 to 2026-05 |
| Commits | 156 mine of 237 |
| Source | GitHub: LawxTech/LawXTech (cloned to a temp folder) |
| Areas touched | src/components, src/pages, src/data, public |
| Needs review | yes |

**Stack:** React (Create React App), TypeScript, React Router, Material UI, styled-components, Framer Motion, AOS, React Slick

**Summary.** The original Law x Tech website: home, about, series, blogs and contact pages introducing the community and its events.

**Problem.** A new legal-tech community needed a first web presence to explain its mission and promote its series.

**Process.** Built a single-page React app with Material UI and scroll animations. Most work happened between October 2023 and January 2024, with small fixes afterwards.

**Outcome.** Served as the organisation's site until the 2026 redesign replaced it.

**Learnings.** Content managed in code became hard for the organisation to update, which led to the CMS in the redesign.

**What I built**

- [web] Built the Home, About, Series, Blogs and Contact pages
- [web] Built events, speaker and review components with carousels
- [web] Built the contact form and site footer
- [web] Added scroll animations and responsive layouts

**Links**

- Live: https://law-x-tech.vercel.app (guess)
- Code: https://github.com/LawxTech/LawXTech (confirmed)

_Notes:_ The live link is the repo's homepage field and is probably an old preview address. Activity is concentrated in Oct 2023-Jan 2024; the 2026-05 end date is a single late fix.

### Export Trades

_Global commodity trading marketplace_

| | |
|---|---|
| Slug | `exportrades-webapp` |
| Organisation | Export Trades |
| Type | client |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (lead committer) |
| Period | 2025-08 to 2026-04 |
| Commits | 99 mine of 169 |
| Source | GitHub: exportrade2025/exportrades-webapp (cloned to a temp folder) |
| Areas touched | src/modules, src/components, src/utils, src/translations, src/app |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI / shadcn, next-intl, TanStack Query, TanStack Table, Redux Toolkit, React Hook Form, Zod / Yup, AWS S3 uploads

**Summary.** A marketing website and web app for a commodity trading platform that connects buyers and sellers and walks them through quoting, escrow and delivery.

**Problem.** Commodity buyers and sellers needed a trusted place to find products, negotiate and complete trades across borders and languages.

**Process.** Built the public site (marketplace, commodities, market trends) and the authenticated app around a module per trading step. Added locale-based routing and translations, and file uploads for verification documents.

**Outcome.** A v0.9 of the website and web app was merged to the main branch in February 2026.

**Learnings.** Building translation in from the start is far easier than retrofitting it.

**What I built**

- [web] Built the public site: hero, marketplace, commodity categories, market index and market trends
- [web] Built sign-up with country selection and OTP verification, login and profile editing
- [web] Built product pages with specifications, certificates and FAQs
- [web] Built requests for quote, expressions of interest, offers and trades, with separate user and admin views
- [web] Built escrow setup and details, dispute management and transaction history
- [web] Added multi-language support with locale routing, including Arabic

**Links**

- Live: https://www.exportrades.com (confirmed)

_Notes:_ Four other contributors authored the other 70 commits, so some listed areas were shared work. The domain is the base URL constant in the repo; I did not check it is live. Confirm the client is happy to be named.

### DS Energy Sales Portal

_Sales and commissions for solar marketers_

| | |
|---|---|
| Slug | `ds-energy-sales-portal` |
| Organisation | DS Energy Ltd |
| Type | client |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2025-08 to 2025-11 |
| Commits | 84 mine of 84 |
| Source | GitHub: DS-Energy/sales-portal-frontend (staging branch; cloned to a temp folder) |
| Areas touched | src/modules, src/components, src/app, src/utils, src/contexts |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI / shadcn, TanStack Query, TanStack Table, Redux Toolkit, React Hook Form, Yup, jsPDF + html2canvas, Vercel Blob, Google OAuth

**Summary.** A portal for managing the marketers and customers of a solar and inverter provider, covering sales, commissions and procurement.

**Problem.** The company needed to track sales made through independent marketers, the customers they bring in and the commissions owed.

**Process.** Built the authenticated dashboard with modules for sales, customers, commissions and procurement, plus onboarding and account-status flows for marketers. Added invoice generation with PDF export.

**Outcome.** No usage figures are recorded in the repo.

**Learnings.** Invoice rendering to PDF needs its own layout rather than a screenshot of the screen view.

**What I built**

- [web] Built auth, multi-step onboarding with file uploads and account-status screens
- [web] Built the sales form with products, services and discounts
- [web] Built sale details and invoices with PDF export and payment links
- [web] Built customers, commissions and procurement-list modules
- [web] Built admin and settings sections

**Links**

- Live: https://sales-portal-frontend-pi.vercel.app (guess)

_Notes:_ The link is the homepage of your personal fork of this repo (a preview-style address that responded when checked), not a documented production URL - likely not something to publish. Your fork has 6 more commits than the organisation repo, running to Dec 2025. Confirm the client is happy to be named.

### Pennywise (mobile app)

_Personal finance and budgeting app_

| | |
|---|---|
| Slug | `pennywise-app` |
| Organisation | Pennywise |
| Type | client |
| Categories | mobile |
| Visibility | private |
| Role | Mobile Developer (sole committer) |
| Period | 2024-03 to 2025-05 |
| Commits | 132 mine of 132 |
| Source | GitHub: iampennywise/pennywise-app (testing branch; cloned to a temp folder) |
| Areas touched | src/components, src/data, src/utils, config/theme, app |
| Needs review | yes |

**Stack:** Expo, React Native, Expo Router, TypeScript, NativeWind, Redux Toolkit, TanStack Query, React Hook Form, MMKV, React Native Skia, Mono Connect, Reanimated

**Summary.** A personal finance app for tracking expenses, managing budgets and working towards financial goals.

**Problem.** Users wanted to see where their money goes and keep to budgets from their phone.

**Process.** Built the app with Expo and expo-router: onboarding, authentication with verification and password reset, wallets, budgets and charts, with bank account linking through a third-party connect widget.

**Outcome.** No store listing or usage figures are recorded in the repo.

**Learnings.** Android build and network configuration took real effort alongside feature work.

**What I built**

- [mobile] Built onboarding, sign-up, verification and a multi-step password reset
- [mobile] Built wallets and amount displays with theming
- [mobile] Built budget creation and expense tracking screens with charts
- [mobile] Added bank account linking and secure local storage
- [mobile] Set up EAS build channels for staging and preview

**Links**

- Live: https://www.iampennywise.com (guess)

_Notes:_ The live link is the marketing site, marked as a guess because I found no store listing for the app.

### Pennywise website

_Marketing site for Pennywise_

| | |
|---|---|
| Slug | `pennywise-website` |
| Organisation | Pennywise |
| Type | client |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (lead committer) |
| Period | 2024-01 to 2025-01 |
| Commits | 206 mine of 208 |
| Source | GitHub: iampennywise/pennywise-website (199 of 201) + iampennywise/website (5 of 5) + iampennywise/landing-page (2 of 2), cloned to a temp folder |
| Areas touched | src/pages, src/components, src/app, src/data, public |
| Needs review | yes |

**Stack:** Next.js, React, TypeScript, Mantine, Tailwind CSS, TanStack Query, React Hook Form, Yup, Lottie, Framer Motion, Radix UI (later version), Docker (later version)

**Summary.** The landing website for the Pennywise finance app, with waitlist sign-up, pricing, contact, community and blog pages.

**Problem.** The product needed a public site to explain the app and collect waitlist sign-ups before launch.

**Process.** Built the first site on the Next.js Pages Router with Mantine, then a second version on the App Router with Tailwind and Radix across two later repos.

**Outcome.** Published on the product's own domain according to the site metadata.

**Learnings.** A later rewrite moved styling from a component library to Tailwind for easier theming.

**What I built**

- [web] Built the landing page with light/dark theme and Lottie animation
- [web] Built the waitlist page and form, with saved progress
- [web] Built pricing, contact, community and blog pages and a 404 page
- [web] Rebuilt the landing page as a second version on the App Router

**Links**

- Live: https://www.iampennywise.com (confirmed)

_Notes:_ Combines three repos. A preview image exists inside the repo (public/assets/images/preview.png) but the repo is not on disk, so it is not listed under visuals. I did not check the domain is still live.

### FarmShare Admin Dashboard

_Admin dashboard for tractor sharing_

| | |
|---|---|
| Slug | `farmshare-admin-dashboard` |
| Organisation | Hotrac (FarmShare) |
| Type | client |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (lead committer) |
| Period | 2023-10 to 2023-11 |
| Commits | 165 mine of 166 |
| Source | GitHub: hotrac-org/fs-admin-dashboard (cloned to a temp folder) |
| Areas touched | src/components, src/utils, src/store, src/layouts, src/pages |
| Needs review | yes |

**Stack:** Next.js (Pages Router), React, TypeScript, Mantine, Tailwind CSS, Redux Toolkit, Chart.js, Google Maps API, React Hook Form, Yup

**Summary.** The administrator's dashboard for FarmShare, a product for sharing tractors and farm equipment between owners and farmers.

**Problem.** Administrators needed to oversee users, tractors, bookings and payments across the platform.

**Process.** Built the dashboard over about a month with a Redux store and reusable table and card components, covering each admin area with list and detail pages.

**Outcome.** No usage figures are recorded in the repo.

**Learnings.** Early project; established the table and page-wrapper patterns reused in later dashboards.

**What I built**

- [web] Built login, sign-up and password reset
- [web] Built users and tractors lists with individual detail pages
- [web] Built bookings, transactions and payment-request screens
- [web] Built analytics, maps, reviews and roles sections

**Links**

- None found

_Notes:_ Organisation name is inferred from the GitHub org slug.

### Tonmax Telegram Mini App

_Crypto referral mini app UI_

| | |
|---|---|
| Slug | `tonmax-telegram-mini-app` |
| Organisation | StellarMaxi (Tonmax) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2024-07 to 2024-07 |
| Commits | 2 mine of 2 |
| Source | GitHub: StellarMaxi/webapp (cloned to a temp folder) |
| Areas touched | src/components, src/app, src/utils |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Mantine, Tailwind CSS, Telegram Web Apps SDK, TON Connect, Stellar SDK, TanStack Query

**Summary.** A Telegram mini app for a crypto platform where users earn through referrals.

**Problem.** The platform needed its interface to run inside Telegram with wallet connection.

**Process.** Built the mini app screens in Next.js with the Telegram SDK and TON wallet connection, delivered in two large commits.

**Outcome.** No usage figures are recorded in the repo.

**Learnings.** Mini apps run in a constrained in-app browser, which shapes layout and navigation.

**What I built**

- [web] Built sign-up, dashboard and settings screens
- [web] Built referral, invite and level screens with an organisation-chart view
- [web] Built mining, transactions and withdrawal screens

**Links**

- None found

_Notes:_ Only 2 commits. Only a test bot link appears in the repo, so no live link is given. Crypto referral product - decide whether you want it in your portfolio.

### Invocipt

_Invoices and receipts for businesses_

| | |
|---|---|
| Slug | `invocipt` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web, fullstack |
| Visibility | private |
| Role | Full-stack Developer (sole committer) |
| Period | 2024-06 to 2025-06 |
| Commits | 595 mine of 595 |
| Source | GitHub: H4LV3D/receipt-app (history-only clone in a temp folder) |
| Areas touched | src/components, src/app, public/images, src/utils, src/types, prisma/schema |
| Needs review | yes |

**Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Prisma, PostgreSQL, Auth.js (NextAuth), Passkeys (SimpleWebAuthn), TanStack Query, TanStack Table, TipTap, React Email, react-pdf, Paystack, Sentry, Vercel Blob, Jest, Husky + commitlint

**Summary.** A SaaS application for generating invoices and converting them into receipts. Businesses customise invoice fields, upload product lists from Excel and manage customers, payments and records.

**Problem.** Small businesses were issuing paper receipts with no digital trail, and needed invoices that match their own business fields.

**Process.** Built the product end to end on Next.js with Prisma and PostgreSQL: a marketing site, authentication, and a client workspace for businesses, customers, invoices, receipts, payments and reports, plus an admin area. Added release tooling with conventional commits and a changelog.

**Outcome.** Reached a tagged 1.0.1 release in June 2025 according to the changelog. The custom domain set on the repo did not respond when checked for this export.

**Learnings.** Treating a side project like a product, with releases, linted commits and tests, kept a large solo codebase manageable.

**What I built**

- [web] Built the marketing site with blog, changelog, help centre, about and contact pages
- [web] Built the client workspace: businesses, customers, invoices, receipts, payments, records, reports and statistics
- [web] Built customisable invoices that convert to receipts, with PDF output and print mode
- [web] Built Excel import for product lists and file uploads for business and profile images
- [backend] Built authentication with email/password, OAuth providers, OTP verification and passkeys
- [backend] Modelled the data with Prisma and PostgreSQL and added online payments
- [web] Added dark and light themes, notifications and an admin area
- [shared] Set up commit linting, pre-commit tests and automated changelog releases

**Links**

- None found

**Visuals**

- `H4LV3D/receipt-app: public/images/hero/hero-light.png`
- `H4LV3D/receipt-app: public/images/hero/hero-dark.png`
- `H4LV3D/receipt-app: public/icon.png`

_Notes:_ The repo homepage is https://invocipt.com.ng, but it did not respond on 2026-10-02, so the live link is left empty - add it back if the site is up. The README also lists Google Drive integration and AI expense predictions; I could not confirm those are built, so they are not in the feature list.

### TrendHub

_Newsletters, podcasts and blogs hub_

| | |
|---|---|
| Slug | `trendhub` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web |
| Visibility | public |
| Role | Frontend Developer (sole committer) |
| Period | 2023-10 to 2024-06 |
| Commits | 523 mine of 523 |
| Source | GitHub: H4LV3D/TrendHub (history-only clone in a temp folder) |
| Areas touched | public/assets, src/assets, src/components, src/app, src/layouts |
| Needs review | no |

**Stack:** Next.js 13 (App Router), React, TypeScript, Tailwind CSS, Redux Toolkit, React Hook Form, Yup, TinyMCE, Chart.js, WaveSurfer, Framer Motion

**Summary.** A website that brings newsletters, podcasts and blogs into one place, designed for Gen Z readers to discover and keep up with content.

**Problem.** Readers had to visit separate platforms for newsletters, podcasts and blogs.

**Process.** Built the public pages for each content type and an authenticated area with a dashboard, an editor for writing posts and content management. Most of the work happened between October and December 2023.

**Outcome.** A demo is deployed and was reachable when checked for this export. The README still marks the project as under construction.

**Learnings.** An early large Next.js App Router project; many of its layout and page-wrapper patterns carried into later work.

**What I built**

- [web] Built home, about, blogs, newsletters and podcasts pages with detail views
- [web] Built sign-up, login and password reset
- [web] Built a dashboard, a rich-text editor and a 'my blogs' management area
- [web] Built podcast pages with an audio waveform player
- [web] Built settings and responsive layouts

**Links**

- Live: https://trendingstuffs.vercel.app/ (confirmed)
- Code: https://github.com/H4LV3D/TrendHub (confirmed)

_Notes:_ About 2,400 of the changed files are image and asset files, which inflates the 523-commit count relative to code written.

### Tosin Farms

_Farm-to-table e-commerce platform_

| | |
|---|---|
| Slug | `tosin-farms` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web, fullstack |
| Visibility | public |
| Role | Full-stack Developer (sole committer) |
| Period | 2026-02 to 2026-03 |
| Commits | 36 mine of 36 |
| Source | GitHub: H4LV3D/tosin-farms (history-only clone in a temp folder) |
| Areas touched | frontend/src, backend/src, backend/prisma, frontend/public |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, NestJS, Prisma, Passport (JWT + Google OAuth), Passkeys (SimpleWebAuthn), Redis cache, Nodemailer

**Summary.** A full-stack e-commerce platform for selling fresh produce and artisan-processed foods directly to customers.

**Problem.** A farm business needed to sell produce online and manage products and customer orders itself.

**Process.** Built a Next.js storefront and a NestJS REST API in one repository, with Prisma for data, Redis caching for the product catalogue and role-based access for customers and admins.

**Outcome.** No live URL or usage figures are recorded in the repo.

**Learnings.** Passkey login alongside password and Google sign-in needed careful session handling across frontend and API.

**What I built**

- [web] Built the shop with categories, product pages and a checkout order summary
- [web] Built the customer portal: orders, tracking, payments, profile, wishlist and addresses
- [web] Built the admin dashboard for managing products and customer orders
- [backend] Built the NestJS API for products, categories, users and orders
- [backend] Built JWT and Google OAuth login, passkey authentication and email password reset
- [backend] Added Redis caching for high-frequency catalogue reads
- [web] Built About, Contact, Privacy and Terms pages

**Links**

- Code: https://github.com/H4LV3D/tosin-farms (confirmed)

_Notes:_ Type (freelance) is a guess - it could be a client job or a personal build. The repo is public; confirm that is intended.

### Personal portfolio (toluwalope.tech)

_My earlier portfolio website_

| | |
|---|---|
| Slug | `personal-portfolio` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web, fullstack |
| Visibility | private |
| Role | Developer (sole committer) |
| Period | 2022-07 to 2024-10 |
| Commits | 363 mine of 363 |
| Source | GitHub: H4LV3D/Portfolio (history-only clone in a temp folder) |
| Areas touched | client/src, client/public, frontend/public, docs |
| Needs review | yes |

**Stack:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Express, MongoDB (Mongoose), Nodemailer

**Summary.** My own portfolio website across several iterations: a React single-page site, a Next.js version and a small Express backend for the contact form.

**Problem.** I needed a public home for my projects and a way for people to contact me.

**Process.** Rebuilt the site several times as my stack changed, moving from a Create React App client to Next.js, with an Express and MongoDB service handling contact email.

**Outcome.** Served on my personal domain according to the repo; the domain did not respond when checked for this export.

**Learnings.** Each rewrite tracked what I was learning at the time.

**What I built**

- [web] Built the portfolio pages with scroll and page animations
- [web] Built a blog section fed from local data
- [backend] Built a contact endpoint that sends email
- [web] Rebuilt the frontend in Next.js with Tailwind

**Links**

- None found

**Visuals**

- `H4LV3D/Portfolio: client/public/preview2.jpg`

_Notes:_ Repo homepage is http://toluwalope.tech, which did not respond on 2026-10-02. Over 4,000 of the changed files are a vendored icon font, so the commit count overstates the code. This is the site you are replacing, so you may not want it listed.

### Cabify (ride booking app)

_Book and track city rides_

| | |
|---|---|
| Slug | `cabify-ride-booking` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web, fullstack |
| Visibility | private |
| Role | Full-stack Developer (sole committer) |
| Period | 2022-04 to 2023-07 |
| Commits | 349 mine of 349 |
| Source | GitHub: H4LV3D/Cabify (history-only clone in a temp folder) |
| Areas touched | Client/src, Client/public, Client/build, routes |
| Needs review | yes |

**Stack:** React, JavaScript, Node.js, Express, MongoDB (Mongoose), JWT auth, Google Maps API, Nodemailer, Multer

**Summary.** A ride-booking web app where users book rides across a city, with maps, email notifications and receipts.

**Problem.** A learning project to build a complete product with accounts, bookings and location features.

**Process.** Built a React client and an Express and MongoDB API, adding authentication, email verification, maps and receipts over about a year.

**Outcome.** The old hosting address no longer responds; no usage figures are recorded.

**Learnings.** First full-stack project: authentication, email flows and deployment.

**What I built**

- [web] Built the booking flow with map-based pickup and destination
- [web] Built sign-up, login and an email verification page
- [backend] Built the Express API with JWT auth and MongoDB models
- [backend] Built transactional emails and ride receipts

**Links**

- None found

**Visuals**

- `H4LV3D/Cabify: Client/public/assets/logo.png`

_Notes:_ 'Cabify' is also the name of a real ride-hailing company - consider renaming this entry before publishing. The README lists planned features (calendar sync, crypto payments, live tracking) that I could not confirm were built. Repo homepage https://cabify.cyclic.app did not respond.

### Workstudy attendance portal

_Student work-study check-in portal_

| | |
|---|---|
| Slug | `workstudy-attendance` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web |
| Visibility | public |
| Role | Frontend Developer (lead committer) |
| Period | 2022-04 to 2023-05 |
| Commits | 206 mine of 346 |
| Source | GitHub: H4LV3D/Workstudy (history-only clone in a temp folder) |
| Areas touched | assets/css, *.html pages, *.php pages |
| Needs review | yes |

**Stack:** HTML, CSS, JavaScript, PHP

**Summary.** An application that lets students check in and out of work-study shifts with a unique code, records attendance in real time, and lets supervisors manage schedules and reports.

**Problem.** Work-study attendance was hard to record and monitor reliably.

**Process.** Built the student, supervisor and admin pages with one other developer, who accounts for the other 140 commits.

**Outcome.** The repo's homepage points to a university portal address, which responded when checked for this export.

**Learnings.** Early team project; first experience sharing a codebase.

**What I built**

- [web] Built login, student activity and attendance pages
- [web] Built the supervisor view
- [web] Built admin dashboard, attendance, add-student and settings pages

**Links**

- Live: https://workstudy.cu.edu.ng/portal (guess)
- Code: https://github.com/H4LV3D/Workstudy (confirmed)

_Notes:_ The live link is on a university domain. I cannot tell whether your code is what runs there or whether you may name the institution, so it is marked as a guess. About 4,200 of the changed files are a vendored icon font.

### CoinSave budget tracker

_Track budgets, wallets and expenses_

| | |
|---|---|
| Slug | `coinsave-budget-tracker` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web, fullstack |
| Visibility | private |
| Role | Full-stack Developer (sole committer) |
| Period | 2023-04 to 2024-06 |
| Commits | 178 mine of 178 |
| Source | GitHub: H4LV3D/Budget-Tracking (history-only clone in a temp folder) |
| Areas touched | Client/src, Client/public, routes, utils |
| Needs review | no |

**Stack:** React, JavaScript, Node.js, Express, MongoDB (Mongoose), Passport (Google OAuth), JWT auth, Nodemailer

**Summary.** A budget tracking web app for following the inflow and outflow of money across wallets, budgets and expenses.

**Problem.** People wanted a simple view of where their money goes to plan spending and saving.

**Process.** Built a React client and an Express and MongoDB API with session and Google sign-in.

**Outcome.** The old hosting address no longer responds; no usage figures are recorded.

**Learnings.** Practised auth with third-party sign-in and error boundaries in React.

**What I built**

- [web] Built dashboard, wallet, budget and expenses pages
- [backend] Built the Express API with MongoDB models
- [backend] Built email/password and Google sign-in

**Links**

- None found

**Visuals**

- `H4LV3D/Budget-Tracking: Client/public/Assets/images/Logo.png`

_Notes:_ Repo homepage https://coinsave.cyclic.app did not respond on 2026-10-02 (that hosting service has shut down). Thousands of the changed files are committed build output.

### Forex Assignment Portal

_Submit and mark trading assignments_

| | |
|---|---|
| Slug | `forex-assignment-portal` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (lead committer) |
| Period | 2023-01 to 2023-10 |
| Commits | 157 mine of 274 |
| Source | GitHub: H4LV3D/Twb-assignment (history-only clone in a temp folder) |
| Areas touched | Assignment-App-Frontend/src, src, public/Assets |
| Needs review | yes |

**Stack:** React (Create React App), JavaScript, Tailwind CSS, React Router, JWT auth, Node.js REST API (by collaborator)

**Summary.** A web application for forex students to submit assignments and for teachers to review and mark them.

**Problem.** A trading school needed a structured way to collect and grade student assignments.

**Process.** Built the React frontend against a Node.js REST API written by a collaborator, who accounts for the other 117 commits.

**Outcome.** No usage figures are recorded. The repo's preview address returned 'not found' when checked.

**Learnings.** Working to a collaborator's API contract.

**What I built**

- [web] Built login and role-based views for students and teachers
- [web] Built assignment lists, submission and assessment sections
- [web] Built the sidebar navigation and responsive layout

**Links**

- None found

_Notes:_ Type (freelance) is a guess. Repo homepage https://twb-assignment.vercel.app returned 404.

### Asteroid

_Clothing brand website_

| | |
|---|---|
| Slug | `asteroid-clothing` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2023-12 to 2024-06 |
| Commits | 135 mine of 135 |
| Source | GitHub: H4LV3D/Asteroid (history-only clone in a temp folder) |
| Areas touched | public/assets, src/components, src/app |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, AOS, Google Drive API, React Hook Form

**Summary.** A website for a clothing brand, showing collections and a shop view.

**Problem.** The brand needed an online presence to show its collections.

**Process.** Built the home, collections and shop pages, with a gallery that pulls images from a cloud drive folder through an API route.

**Outcome.** No live URL or usage figures are recorded in the repo.

**Learnings.** Serving a gallery from a drive folder let the owner update images without code changes.

**What I built**

- [web] Built the home page with banner and collections
- [web] Built the shop page with product display cards
- [web] Built a gallery fed from a cloud drive folder
- [web] Built contact forms and scroll animations

**Links**

- None found

_Notes:_ Type (freelance) is a guess. Heads-up unrelated to the portfolio: this repo has a file named like an API credentials file committed at its root - worth checking and rotating if it is real.

### ZapTasks

_Fast, accessible todo app_

| | |
|---|---|
| Slug | `zaptasks` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web |
| Visibility | private |
| Role | Developer (sole author) |
| Period | 2025-06 to 2025-06 |
| Commits | 60 mine of 61 |
| Source | GitHub: H4LV3D/todo-app-altshool-exam (history-only clone in a temp folder) |
| Areas touched | app/pages, app/components, components/ui, app/utils |
| Needs review | no |

**Stack:** React 19, React Router 7, TypeScript, Vite, Tailwind CSS, shadcn/ui + Radix UI, TanStack Query, Axios, Docker

**Summary.** A responsive todo application built as a frontend engineering school project, demonstrating API integration, routing, error handling and accessibility.

**Problem.** A course exam brief: build a complete, accessible CRUD app against an API.

**Process.** Built the app with React Router and TanStack Query in about two weeks, with paginated lists, nested detail routes and error states.

**Outcome.** Submitted as a school project. The preview address returned 'not found' when checked.

**Learnings.** Practised accessible components, pagination and optimistic feedback.

**What I built**

- [web] Built the todo list with client-side pagination, search and status filters
- [web] Built a todo detail page as a nested route
- [web] Built create, update and delete with loading and error states
- [web] Added light and dark themes and an error-boundary test page

**Links**

- None found

_Notes:_ Coursework. Repo homepage https://todo-app-altshool-exam.vercel.app returned 404. Two near-copies exist (todo-vuejs, a Vue rewrite, and todo-nextjs) - see otherRepos.

### Receipt Print

_Digital receipts instead of paper_

| | |
|---|---|
| Slug | `receipt-print` |
| Organisation | none (personal) |
| Type | personal |
| Categories | web, fullstack |
| Visibility | public |
| Role | Developer (sole committer) |
| Period | 2022-12 to 2024-09 |
| Commits | 53 mine of 53 |
| Source | GitHub: H4LV3D/Reciept-Print (history-only clone in a temp folder) |
| Areas touched | Reciept, modules, assets |
| Needs review | yes |

**Stack:** Node.js, Express, JavaScript, HTML, Bootstrap, PDF.js

**Summary.** A small tool that replaces a paper receipt system with digital receipts, leaving a trail a company can follow and monitor.

**Problem.** Paper receipts were easy to lose and hard to audit.

**Process.** Built an Express server with HTML receipt templates and PDF handling. It was the precursor to Invocipt.

**Outcome.** No usage figures are recorded in the repo.

**Learnings.** The limits of this tool shaped the later SaaS version.

**What I built**

- [web] Built receipt input and printable receipt templates
- [backend] Built the Express server and PDF handling

**Links**

- Code: https://github.com/H4LV3D/Reciept-Print (confirmed)

_Notes:_ This PUBLIC repo contains what look like real business documents at its root (a PDF and a zip archive of receipts). Check them before linking to the repo, and consider removing them. The link to Invocipt as its successor is my inference from the shared theme.

### Wisemonie

_Trading dashboard and admin console_

| | |
|---|---|
| Slug | `wisemonie` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2024-05 to 2024-05 |
| Commits | 35 mine of 35 |
| Source | GitHub: H4LV3D/wisemonie (history-only clone in a temp folder) |
| Areas touched | src/components, src/app, src/layouts, src/utils, src/store |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Mantine, Tailwind CSS, Redux Toolkit, TanStack Query, Chart.js, React Hook Form, Yup

**Summary.** A web dashboard for a trading and investment product, with a user area and an admin console.

**Problem.** The product needed user and admin interfaces for trades and transactions.

**Process.** Built the frontend in about a week with Mantine and Redux, using generated sample data.

**Outcome.** A preview deployment responded when checked for this export; no usage figures are recorded.

**Learnings.** Fast delivery of a dashboard from reusable layouts.

**What I built**

- [web] Built registration, login and password reset
- [web] Built the user dashboard, trade screen, transactions and a profit calculator
- [web] Built admin pages for users, transactions, active trades and settings

**Links**

- Live: https://wisemonie.vercel.app (guess)

_Notes:_ Type (freelance) is a guess. The link is a preview-style address. The data appears to be sample data, so this may be a UI prototype rather than a live product.

### Ticki Admin

_Admin console for event ticketing_

| | |
|---|---|
| Slug | `ticki-admin` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (lead committer) |
| Period | 2024-03 to 2024-10 |
| Commits | 38 mine of 51 |
| Source | GitHub: H4LV3D/ticki_admin (history-only clone in a temp folder) |
| Areas touched | components/pageWrappers, components/shared, hooks, app/events, redux/Slices, components/forms |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Mantine, Material UI, Tailwind CSS, Redux Toolkit, TanStack Query, TanStack Table, React Hook Form

**Summary.** An admin web app for an event ticketing product, covering events, tickets, users and analysis.

**Problem.** The ticketing team needed to create and manage events, categories and users from one console.

**Process.** Built most of the admin screens on top of an existing codebase; one other developer accounts for the remaining 13 commits.

**Outcome.** A preview deployment responded when checked for this export; no usage figures are recorded.

**Learnings.** An earlier ticketing admin that informed the later Circular Ticket work.

**What I built**

- [web] Built events pages: list, create, categories and types
- [web] Built event ticket tables with profit totals
- [web] Built user management, profile and password reset
- [web] Built dashboard and analysis views

**Links**

- Live: https://ticki-admin-app.vercel.app (guess)

_Notes:_ Type (freelance) is a guess and the client is not named in the repo. The link is a preview-style address. The 'informed Circular Ticket' learning is my inference. Heads-up: an env file is committed in this repo.

### Gemspay website

_Marketing site for a payments company_

| | |
|---|---|
| Slug | `gemspay-website` |
| Organisation | Gemspay Solutions Limited |
| Type | client |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2024-05 to 2025-06 |
| Commits | 28 mine of 28 |
| Source | GitHub: H4LV3D/gemspay-website (history-only clone in a temp folder) |
| Areas touched | src/app, src/components, public/img, public/logos |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, TanStack Query, Lottie, AOS, Embla Carousel

**Summary.** The marketing website for a payments company, presenting its products, pricing and support content.

**Problem.** The company needed a site to explain its payment products and capture demo requests.

**Process.** Built the first version in 2024, then a second landing-page version in mid-2025 with new product, blog and pricing layouts.

**Outcome.** A preview deployment responded when checked for this export; the production domain is not recorded in the repo.

**Learnings.** Restructured product pages around shared data so new products need no new layout.

**What I built**

- [web] Built the home page and a 'why us' page
- [web] Built product listing and product detail pages
- [web] Built blog, pricing, FAQ and help pages
- [web] Built request-a-demo, contact and newsletter forms
- [web] Built legal pages including dispute resolution

**Links**

- Live: https://gemspay-website.vercel.app (guess)

**Visuals**

- `H4LV3D/gemspay-website: public/images/landing-dashboard.png`
- `H4LV3D/gemspay-website: src/app/opengraph-image.png`

_Notes:_ Engagement type is a guess and the link is a preview address. Product names inside the site were left out in case they are not public.

### Architekt

_Architecture studio website_

| | |
|---|---|
| Slug | `architekt` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2025-12 to 2026-02 |
| Commits | 27 mine of 27 |
| Source | GitHub: H4LV3D/company (history-only clone in a temp folder) |
| Areas touched | src/components, src/app, src/lib, public/images |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Genkit (Google AI), Databuddy analytics

**Summary.** A company website for an architecture studio, with project case studies, pricing and careers.

**Problem.** The studio needed a site to present its projects and take enquiries.

**Process.** Built from a cloud IDE starter, then restructured into reusable sections with scroll animations and a projects area with detail pages.

**Outcome.** A preview deployment responded when checked for this export; no usage figures are recorded.

**Learnings.** Reusable section and animation components kept a content-heavy site consistent.

**What I built**

- [web] Built home, about, pricing, careers and contact pages
- [web] Built the projects listing, project detail pages and a similar-projects carousel
- [web] Built scroll-triggered animations, flip cards and a floating contact button
- [web] Built error and not-found pages and legal pages

**Links**

- Live: https://company-eta-seven.vercel.app (guess)

_Notes:_ Type (freelance) is a guess; 'Architekt' is the site title in the code and may be a placeholder brand. The link is a preview-style address.

### Royal Revamps

_Personal and corporate branding site_

| | |
|---|---|
| Slug | `royal-revamps` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web, fullstack |
| Visibility | private |
| Role | Full-stack Developer (sole committer) |
| Period | 2024-10 to 2026-07 |
| Commits | 22 mine of 22 |
| Source | GitHub: H4LV3D/royal-revamp (history-only clone in a temp folder) |
| Areas touched | src/app, src/components, public, prisma/schema |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Prisma, React Hook Form, Yup, Swiper, AOS

**Summary.** A website for a personal and corporate branding consultancy, with services, learning articles and client testimonials.

**Problem.** The consultancy needed a site to present its services and collect enquiries and newsletter sign-ups.

**Process.** Built the pages and API routes with Prisma models for blog posts, contacts and testimonials. Most work was in late 2024, with a data-fetching fix in July 2026.

**Outcome.** A preview deployment responded when checked for this export; no usage figures are recorded.

**Learnings.** Small database-backed content models are enough for a brochure site that the owner updates occasionally.

**What I built**

- [web] Built home, services, about, company and contact pages
- [web] Built a learn section with article pages
- [backend] Built API routes and Prisma models for testimonials, contacts and blog posts
- [web] Built a testimonial carousel, a consult-us call to action and newsletter sign-up

**Links**

- Live: https://royal-revamp.vercel.app (guess)

**Visuals**

- `H4LV3D/royal-revamp: public/hero.png`
- `H4LV3D/royal-revamp: public/logo.png`

_Notes:_ Type (freelance) is a guess. The link is a preview-style address, not a documented production domain. Confirm the client can be named.

### Life Fount Medical Center website

_Multilingual hospital website_

| | |
|---|---|
| Slug | `life-fount-medical` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2025-08 to 2025-11 |
| Commits | 11 mine of 11 |
| Source | GitHub: H4LV3D/life-crest (history-only clone in a temp folder) |
| Areas touched | src/components, src/app, src/translations, public |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI, next-intl, TanStack Query, Databuddy analytics

**Summary.** A mobile-first website for a hospital, presenting its services in English, Yoruba, Igbo and Hausa.

**Problem.** The hospital needed a site its patients could read in their own language, with clear emergency contact details.

**Process.** Built the site with locale-based routing and translation files, reusing structure from an earlier multilingual project.

**Outcome.** No live URL is confirmed; the repo's preview address returned 'not found' when checked.

**Learnings.** Planning copy as translation keys from the start made four languages manageable.

**What I built**

- [web] Built home, about, services, careers, FAQ and contact pages
- [web] Added four-language support with locale routing
- [web] Built service cards and an emergency contact display

**Links**

- None found

**Visuals**

- `H4LV3D/life-crest: public/images/about-us-hero.jpg`
- `H4LV3D/life-crest: public/logo.png`

_Notes:_ Type (freelance) is a guess. Repo homepage https://life-crest-ten.vercel.app returned 404. Confirm the client can be named.

### Tenfun Enterprises dashboard

_Shop and invoice dashboard_

| | |
|---|---|
| Slug | `tenfun` |
| Organisation | none (personal) |
| Type | freelance |
| Categories | web |
| Visibility | private |
| Role | Frontend Developer (sole committer) |
| Period | 2024-06 to 2024-09 |
| Commits | 15 mine of 15 |
| Source | GitHub: H4LV3D/tenfun (history-only clone in a temp folder) |
| Areas touched | src/components, src/app, src/store |
| Needs review | yes |

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, TanStack Table, Chart.js, React Hook Form

**Summary.** An internal dashboard for a small business, with a shop view, invoices and notifications.

**Problem.** The business needed a simple back-office for products and invoices.

**Process.** Built the authenticated dashboard shell with a sidebar, data tables and charts.

**Outcome.** No live URL or usage figures are recorded in the repo.

**Learnings.** A small build that reused table and layout patterns.

**What I built**

- [web] Built login and the dashboard layout with sidebar
- [web] Built shop and invoice pages with data tables
- [web] Built notifications and an admin section

**Links**

- None found

_Notes:_ Type (freelance) is a guess. Small project (15 commits). Confirm the client can be named.

### NGX stock bot

_Daily stock-market analysis bot_

| | |
|---|---|
| Slug | `ngx-stock-bot` |
| Organisation | none (personal) |
| Type | personal |
| Categories | fullstack |
| Visibility | private |
| Role | Developer (sole committer) |
| Period | 2026-02 to 2026-02 |
| Commits | 18 mine of 18 |
| Source | GitHub: H4LV3D/stock-bot (history-only clone in a temp folder) |
| Areas touched | stockbot.py, .github/workflows, requirements |
| Needs review | no |

**Stack:** Python, BeautifulSoup, Requests, AWS Lambda, boto3, GitHub Actions

**Summary.** A scheduled Python bot that analyses the Nigerian stock exchange, pre-filtering the day's biggest losers for closer analysis.

**Problem.** I wanted a daily summary of notable movers without checking the exchange site by hand.

**Process.** Wrote a scraper and analysis script, slimmed its dependencies for serverless deployment, and set up a GitHub Actions workflow that deploys it to AWS Lambda.

**Outcome.** Deployment workflow and function configuration are in the repo; no results or accuracy figures are recorded.

**Learnings.** Keeping dependencies light matters for serverless packaging.

**What I built**

- [backend] Built the scraper and daily-losers pre-filter
- [backend] Replaced a heavy data library with a lightweight HTML parser for deployment
- [backend] Set up automated deployment to AWS Lambda with GitHub Actions

**Links**

- None found

_Notes:_ Categories uses 'fullstack' because the schema has no backend-only value. The only non-JavaScript project in the export.

## Other repos (not full projects)

Repos in my personal account with commits by me that are coursework, forks, duplicates or too small or sensitive to list as projects.

| Repo | Visibility | Commits (mine/total) | Period | What it is |
|---|---|---|---|---|
| H4LV3D/H4LV3D | public | 23/30 | 2021-06 to 2023-10 | GitHub profile README. Its two newest branches hold a new Next.js portfolio site committed by an AI coding agent on 2026-10-02 (7 commits) - not counted as yours. |
| H4LV3D/sales-portal-frontend | private | 90/91 | 2025-08 to 2025-12 | Your fork of the DS Energy sales portal - same project as ds-energy-sales-portal, with 6 more commits than the organisation repo. |
| H4LV3D/sales-portal-backend | private | 1/102 | 2025-11 | Fork of the DS Energy backend, written by a collaborator; your one commit is a deployment change. |
| H4LV3D/flutter_app | private | 7/7 | 2025-01 | Flutter mobile app for a payments company. The commits look like an import of an existing codebase plus build fixes, so I did not claim it as Flutter experience - tell me if you wrote it. |
| H4LV3D/[client-name]-portfolio | private | 14/17 | 2024-05 to 2024-06 | Portfolio website built for another developer (Next.js, Sanity CMS, Zustand). Left out of projects because the name and link identify a private individual. |
| H4LV3D/portfolio_next | private | 10/10 | 2023-08 | Portfolio website built for another developer (Next.js, Tailwind). Left out of projects for the same reason. |
| H4LV3D/InstaSpot | private | 8/10 | 2025-06 | 'Spots' photo-sharing practice app in React and Vite; 2 commits by a UI-generation bot. |
| H4LV3D/deezhotpot | private | 5/194 | 2025-03 to 2025-05 | Restaurant website mostly written by someone else; your commits are the initial setup and domain configuration. |
| H4LV3D/Circle9 | public | 3/39 | 2025-05 | Fork of a group slide deck (Slidev); you wrote the section on JavaScript modules. |
| H4LV3D/opensource101 | public | 3/98 | 2023-04 to 2023-05 | Fork of a beginner open-source project; small README contributions and two issue fixes. |
| H4LV3D/todo-vuejs | public | 2/2 | 2025-10 | Vue 3 + Pinia rewrite of the ZapTasks todo app. |
| H4LV3D/todo-nextjs | public | 1/1 | 2025-10 | Copy of the ZapTasks todo app (despite the name it is still the React Router version). |
| H4LV3D/hng-stage-one | public | 4/4 | 2025-10 | Internship task: accessible multi-page profile site in HTML, CSS and JavaScript. |
| H4LV3D/stage-zero | public | 2/2 | 2025-10 | Internship task: accessible profile card component. |
| H4LV3D/altschool-assignments | public | 4/4 | 2025-02 to 2025-06 | HTML and CSS coursework. |
| H4LV3D/spots-alt-school-assignment | public | 6/6 | 2025-05 | HTML and CSS coursework. |
| H4LV3D/skills-introduction-to-codeql | public | 3/9 | 2025-06 | GitHub Skills course exercise (code scanning). |
| H4LV3D/skills-introduction-to-github | public | 3/5 | 2025-05 | GitHub Skills course exercise. |
| H4LV3D/mini_Proj | public | 23/23 | 2021-12 to 2022-02 | Early static portfolio site (HTML/CSS), still served on GitHub Pages. |
| H4LV3D/Advanced-projects | public | 28/28 | 2020-08 to 2021-01 | First HTML, CSS and JavaScript practice projects. |
| H4LV3D/MyProjects | public | 29/29 | 2020-08 to 2020-12 | First portfolio site and CSS animation practice. |
| H4LV3D/Eletrical-Generators | private | 20/20 | 2022-10 to 2023-05 | Document storage for a university final-year project; not a software project. |

## Skills

- **Frontend:** Next.js (App Router and Pages Router), React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Mantine, Material UI, TanStack Query, TanStack Table, Redux Toolkit, React Hook Form, Zod, Yup, TipTap, Framer Motion / Motion, next-intl, Recharts, Vite, React Router 7, PHP (early work)
- **Backend:** Auth.js (NextAuth), Neon Postgres, Vercel Blob, Next.js API routes and server actions, OAuth 2.0 flows (client side), AWS S3 uploads, NestJS, Prisma, PostgreSQL, Express, MongoDB (Mongoose), Passkeys (WebAuthn), Redis caching, Python
- **Mobile:** Expo, React Native, Expo Router, NativeWind, EAS Build, Reanimated, Stream Video SDK, Stream Chat, Pusher, Notifee, react-native-track-player
- **Tooling:** npm workspaces (monorepo), tsup, ESLint, Docker, Vercel, npm publishing, Databuddy analytics, Git branching with staging and main, AWS Lambda, GitHub Actions, Jest, Husky + commitlint

Evidence per skill is in `portfolio-export.json` under `skills.evidence`.

## Needs my review

**Across the whole export**

- 'dynamix23' on about 57 older commits is counted as you (same email / same GitHub account number) - confirm it is your old username.
- Role titles and engagement types (employment, volunteer, client, freelance) are inferred for every organisation; none are documented in the repos.
- Client names (Export Trades, DS Energy, Pennywise, Hotrac/FarmShare, StellarMaxi/Tonmax, Gemspay): confirm each can be named publicly.
- Personal projects: I guessed 'personal' vs 'freelance' for each; several look like client sites whose owners should agree to be named.
- Possible sensitive files in your own repos (not copied here): a credentials-style file in Asteroid and one client-portfolio repo, a committed env file in ticki_admin and one client-portfolio repo, and business documents in the PUBLIC Reciept-Print repo.

**Experience entries**

- **The Circular Net Limited** - Role title and employment type are inferred, not documented in the repos. Start date is my first commit in the earlier web app repo (tbn-webapp, Dec 2023); the current repos start mid-2025.
- **Law x Tech** - Type (volunteer vs freelance/client) and role title are guesses - nothing in the repos states them.
- **Export Trades** - Engagement type and role title are guesses. Confirm you are happy to name this organisation.
- **DS Energy Ltd** - Engagement type and role title are guesses. No production URL found in the repo.
- **Pennywise** - Engagement type and role title are guesses. I did not check whether the site is still live.
- **Hotrac (FarmShare)** - Organisation name is taken from the GitHub org slug (hotrac-org); the product name FarmShare is from the README. Engagement type is a guess.
- **StellarMaxi (Tonmax)** - Very small footprint (2 commits). Decide whether it belongs in the portfolio at all.
- **Gemspay Solutions Limited** - Engagement type and role title are guesses. A Flutter app for the same company also sits in your account (see otherRepos) but looks imported rather than written by you.
- **Independent projects** - This groups personal builds and what look like client jobs. I could not tell which were paid, so each project's type (personal vs freelance) is a guess for you to correct.

**Projects**

- **Circular Ticket (mobile app)** (`circular-ticket-mobile`) - The live link is the web app's domain, not a store listing - I found no App Store or Play Store URL for Circular Ticket. Commit counts for the three monorepo projects overlap, because one commit often touches several apps (the whole monorepo is 226 commits, all mine). No app screenshots exist in the repo, only icons and illustrations.
- **Circular Ticket (web app)** (`circular-ticket-web`) - Commit count is for the monorepo path only; the earlier standalone repo adds 198 more, with some history duplicated when it was synced into the monorepo. The domain comes from the marketing site's example environment file; I did not open it to check it is live. Hero images may be stock photography - check licensing before reuse.
- **The Circular Net Admin Dashboard** (`tcn-admin-dashboard`) - Only a staging address appears in the repo, so I left the live link empty (internal hostname). The dashboard also has a section for a second in-house app called Zola - I could not tell whether that name is public, so check before mentioning it.
- **@thebasenet/ui** (`thebasenet-ui`) - No git history exists locally and the GitHub repo named in package.json was not reachable, so I have no dates or commit counts and cannot prove authorship from history. Fill in the period yourself. Visibility is 'public' because the package is on public npm; the source repo is not public.
- **network-requests-ui** (`network-requests-ui`) - No git remote and not on npm, so I marked it private and personal. If you built it as part of your Circular Net work, change the type and organisation. package.json is set up for public MIT publishing.
- **The Circular Net web app (first version)** (`the-circular-net-web-v1`) - The count is across all branches and includes many small commits. You may want to merge this into the current web app entry as its history rather than show it separately.
- **The Circular Net mobile app (earlier build)** (`tcn-mobile-legacy`) - Only 3 commits are yours. 18 commits by 'Tolu Wade' were NOT counted as you (see Identities). Probably not worth a portfolio entry on its own.
- **Law x Tech website (2026 redesign)** (`lawxtech-website`) - The metrics are the organisation's own community figures hard-coded on the home page, not results of your work - use them as context only. The 3 commits not counted are merges made from the Law x Tech org account. Project type (volunteer) is a guess.
- **Law x Tech website (original)** (`lawxtech-website-v1`) - The live link is the repo's homepage field and is probably an old preview address. Activity is concentrated in Oct 2023-Jan 2024; the 2026-05 end date is a single late fix.
- **Export Trades** (`exportrades-webapp`) - Four other contributors authored the other 70 commits, so some listed areas were shared work. The domain is the base URL constant in the repo; I did not check it is live. Confirm the client is happy to be named.
- **DS Energy Sales Portal** (`ds-energy-sales-portal`) - The link is the homepage of your personal fork of this repo (a preview-style address that responded when checked), not a documented production URL - likely not something to publish. Your fork has 6 more commits than the organisation repo, running to Dec 2025. Confirm the client is happy to be named.
- **Pennywise (mobile app)** (`pennywise-app`) - The live link is the marketing site, marked as a guess because I found no store listing for the app.
- **Pennywise website** (`pennywise-website`) - Combines three repos. A preview image exists inside the repo (public/assets/images/preview.png) but the repo is not on disk, so it is not listed under visuals. I did not check the domain is still live.
- **FarmShare Admin Dashboard** (`farmshare-admin-dashboard`) - Organisation name is inferred from the GitHub org slug.
- **Tonmax Telegram Mini App** (`tonmax-telegram-mini-app`) - Only 2 commits. Only a test bot link appears in the repo, so no live link is given. Crypto referral product - decide whether you want it in your portfolio.
- **Invocipt** (`invocipt`) - The repo homepage is https://invocipt.com.ng, but it did not respond on 2026-10-02, so the live link is left empty - add it back if the site is up. The README also lists Google Drive integration and AI expense predictions; I could not confirm those are built, so they are not in the feature list.
- **Tosin Farms** (`tosin-farms`) - Type (freelance) is a guess - it could be a client job or a personal build. The repo is public; confirm that is intended.
- **Personal portfolio (toluwalope.tech)** (`personal-portfolio`) - Repo homepage is http://toluwalope.tech, which did not respond on 2026-10-02. Over 4,000 of the changed files are a vendored icon font, so the commit count overstates the code. This is the site you are replacing, so you may not want it listed.
- **Cabify (ride booking app)** (`cabify-ride-booking`) - 'Cabify' is also the name of a real ride-hailing company - consider renaming this entry before publishing. The README lists planned features (calendar sync, crypto payments, live tracking) that I could not confirm were built. Repo homepage https://cabify.cyclic.app did not respond.
- **Workstudy attendance portal** (`workstudy-attendance`) - The live link is on a university domain. I cannot tell whether your code is what runs there or whether you may name the institution, so it is marked as a guess. About 4,200 of the changed files are a vendored icon font.
- **Forex Assignment Portal** (`forex-assignment-portal`) - Type (freelance) is a guess. Repo homepage https://twb-assignment.vercel.app returned 404.
- **Asteroid** (`asteroid-clothing`) - Type (freelance) is a guess. Heads-up unrelated to the portfolio: this repo has a file named like an API credentials file committed at its root - worth checking and rotating if it is real.
- **Receipt Print** (`receipt-print`) - This PUBLIC repo contains what look like real business documents at its root (a PDF and a zip archive of receipts). Check them before linking to the repo, and consider removing them. The link to Invocipt as its successor is my inference from the shared theme.
- **Wisemonie** (`wisemonie`) - Type (freelance) is a guess. The link is a preview-style address. The data appears to be sample data, so this may be a UI prototype rather than a live product.
- **Ticki Admin** (`ticki-admin`) - Type (freelance) is a guess and the client is not named in the repo. The link is a preview-style address. The 'informed Circular Ticket' learning is my inference. Heads-up: an env file is committed in this repo.
- **Gemspay website** (`gemspay-website`) - Engagement type is a guess and the link is a preview address. Product names inside the site were left out in case they are not public.
- **Architekt** (`architekt`) - Type (freelance) is a guess; 'Architekt' is the site title in the code and may be a placeholder brand. The link is a preview-style address.
- **Royal Revamps** (`royal-revamps`) - Type (freelance) is a guess. The link is a preview-style address, not a documented production domain. Confirm the client can be named.
- **Life Fount Medical Center website** (`life-fount-medical`) - Type (freelance) is a guess. Repo homepage https://life-crest-ten.vercel.app returned 404. Confirm the client can be named.
- **Tenfun Enterprises dashboard** (`tenfun`) - Type (freelance) is a guess. Small project (15 commits). Confirm the client can be named.

## Identities found

**Counted as me**

- Toluwalope Akinkunmi <akinkunmitolulope23@gmail.com> (git config user.email)
- Toluwalope <akinkunmitolulope23@gmail.com>
- Toluwalope Akinkunmi <64863887+H4LV3D@users.noreply.github.com>
- Moyinoluwa <64863887+H4LV3D@users.noreply.github.com> (confirmed by you on 2026-10-02)
- GitHub user H4LV3D
- H4LV3D <akinkunmitolulope23@gmail.com> and h4lv3d <akinkunmitolulope23@gmail.com> (same email, GitHub handle as name)
- dynamix23 / Dynamix23 <akinkunmitolulope23@gmail.com> (same email; appears to be your earlier GitHub username)
- Toluwalope Akinkunmi <64863887+dynamix23@users.noreply.github.com> and dynamix23 <64863887+dynamix23@users.noreply.github.com> (same GitHub account number as H4LV3D)

**Please confirm**

- **Tolu Wade (GitHub: toluwade / thetoluwade, fiatmatch.com address)** - not counted. Seen in: TheBaseNet/TCN_mobile (18 commits). Matches the name 'Tolu' in your rule, but it is tied to separate GitHub accounts and a different email domain, so I treated it as another person.
- **Law x Tech org account (LawxTech noreply address and the org's Gmail address)** - not counted. Seen in: LawxTech/lawxtech-website (3 merge commits), LawxTech/LawXTech (75 commits). Commits made from the organisation's own GitHub account. Say so if some of these were you working while signed in as the org.
- **copilot-swe-agent[bot]** - not counted. Seen in: tcn-webapp (1 commit). Automated agent commit, not attributed to you.
- **dynamix23 (name on about 57 commits in older personal repos)** - counted. Seen in: Personal repos from 2020-2023 (e.g. Workstudy, Cabify, early portfolio repos). Counted because it uses your email or the same GitHub account number as H4LV3D. Confirm it is your old username.
- **Claude <noreply@anthropic.com>, v0 and Vercel bots, github-actions, dependabot** - not counted. Seen in: H4LV3D/H4LV3D (7), InstaSpot, todo-app-altshool-exam, sales-portal-frontend, GitHub Skills repos. Automated or AI-agent commits, not attributed to you.

## Scan notes

- Local repos: events-workspace, lawxtech-website, network-requests-ui, sso-frontend, tcn-admin-webapp, tcn-mobileapp, tcn-ui, tcn-webapp, thecircularnet-website
- GitHub orgs: hotrac-org, Law-x-Tech (0 repos), TheBaseNet, iampennywise, StellarMaxi, DS-Energy, exportrade2025, LawxTech (a user account, not an org; scanned because the local remote points there)
- Org repos with no commits by me (skipped): 17
- Personal account: All 41 repositories under github.com/H4LV3D. 19 became project entries; the other 22 are listed under otherRepos with a one-line reason.
- Areas for personal repos: For personal repos I cloned history without file contents, so 'areas' are ranked by number of files I changed rather than lines changed.
- Link check: Personal live links were requested once on 2026-10-02. Links that did not respond or returned 404 were left empty and the address is recorded in that project's notes.
- Privacy: No source code, keys, tokens, env values, staging or API hostnames, collaborator names, partner names or ticket numbers were copied into the export.
