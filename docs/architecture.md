# Architecture

How the code is organized and why.

## Layout

```text
src/
├── app/                    thin routes, only compose features
│   ├── layout.tsx          root layout: html shell, Header, Footer
│   ├── page.tsx            home page
│   ├── not-found.tsx       404 page
│   ├── contact/
│   ├── download/
│   ├── privacy-policy/
│   └── terms-of-service/
│
├── features/               one directory per feature
│   ├── beta-access/        /download page content and form
│   ├── contact/            /contact page content and form
│   ├── cta/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, footer, back-to-top button
│   ├── legal/              privacy policy and terms of service content
│   ├── screenshots/        carousel
│   └── workflow/
│
└── shared/                 code with no feature of its own
    ├── components/         download-button, ping-indicator
    │   └── ui/              shadcn primitives (accordion)
    ├── icons/               brand SVGs (Google Play, GitHub, LinkedIn)
    └── lib/                 cn (class merging), email (EmailJS wrapper)
```

Each feature holds only the layers it actually needs:

```text
features/<name>/
├── components/       the feature's UI
├── data/             static content and its types (only when the feature has any)
└── index.ts          the feature's public API
```

## Dependency rules

- Imports only go down: `app` → `features` → `shared`.
- `shared/` never imports from `features/`.
- `app/` and a feature may only reach another feature through its
  `index.ts` barrel, never a file inside it. A feature's own internal files
  are fair game for that same feature.
- Files in kebab-case, components in PascalCase.

`eslint.config.mjs`'s `import/no-restricted-paths` is what actually enforces
these rules: `pnpm lint` fails on a cross-boundary import, so this document
can't drift from what's really allowed the way a comment-only convention
could.

## Exceptions

None right now. Every feature-to-feature import goes through a barrel.

## Rendering

- `app/page.tsx` and `app/layout.tsx` are Server Components: they only
  compose feature components, with no hooks or state of their own.
- `/privacy-policy`, `/terms-of-service`, and the 404 page are pure Server
  Components too: no interactivity, just text and `Link`.
- `/contact` and `/download` each split into a Server Component for the
  static page chrome (heading, copy, sidebar links) and a small Client
  Component for the form itself (`ContactForm`, `BetaAccessForm`), which is
  the only part that needs `useState`/`useForm`.
- `Header` stays a Client Component end-to-end: it derives whether to
  render solid or transparent from the current route (`usePathname()`) and
  reacts to scroll and the mobile menu, so it needs state and effects
  throughout. `Footer` is a Server Component except for `BackToTopButton`,
  its one interactive piece.
- The rest of the home page's sections (hero, features, workflow,
  screenshots, FAQ, CTA) are Client Components, mostly for their hover and
  entrance interactions; converting them is tracked separately, alongside
  the other animation and accessibility work in the update plan.
- The whole site is static: every route is prerendered at build time
  (`next build`), with no per-request server rendering and no dynamic data.

## Forms

`/contact` and `/download` both submit through EmailJS
(`@emailjs/browser`), directly from the browser: there is no backend of
our own. Both go through the same `shared/lib/email.ts` helper
(`sendEmail`), which reads the three
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`/`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`/`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
environment variables, inlined at build time, and throws a friendly error
if any is missing instead of attempting the request. No test, e2e spec,
or `act` run ever lets a request reach `api.emailjs.com` for real: it's
always intercepted or given fake credentials that only work against a
mocked endpoint.

## Screenshots

The screenshots in `public/screenshots/` (`01_home.png` … `10_workspace_layout_settings.png`)
and their `alt` text in `screenshots-carousel.tsx` come straight from
`sql_studio_app/screenshots/en/` and the captions in that repo's
`README.md`. To update them after an app release: copy the new PNGs from
`sql_studio_app/screenshots/en/` over the files in `public/screenshots/`
(same names), and update the `alt` values in
`features/screenshots/components/screenshots-carousel.tsx` if the
captions in the app's README changed. The workflow section's mockup
(`features/workflow/components/workflow-section.tsx`) reuses
`03_editor.png` and needs no separate update.

## Decisions

- **Why SSG.** The site has no user accounts, no per-visitor content, and
  no data that changes between requests: a marketing page, screenshots, an
  FAQ, legal pages, two forms. There's nothing to render per request, so
  prerendering every route at build time makes each one a static file,
  cacheable at the edge, with none of the cost of a server render nobody
  needs.
- **Why feature-first.** The site is a handful of clearly separate pages
  and sections (hero, contact form, legal pages, ...), each with its own
  copy and, in a few cases, its own data or form logic. Grouping by feature
  keeps everything a page or section needs in one place, instead of
  splitting it across parallel `components/`, `constants/`, `context/`,
  `lib/`, `utils/`, and `@types/` trees the way the project did before this
  restructuring: the layout this document describes replaced that.
- **Why split page content from the form.** `/contact` and `/download`
  used to be one big Client Component each, form and static copy together,
  because the form needed `"use client"` for its hooks. Pulling the form
  into its own component lets the rest of the page (most of it: headings,
  paragraphs, sidebar links) ship as server-rendered HTML with no
  JavaScript of its own.
