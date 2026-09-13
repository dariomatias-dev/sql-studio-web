<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- **Language.** All code (identifiers, comments) and all user-facing text
  is in English. Repo documentation ships in three languages once it
  exists (`docs/`, root READMEs): flat, suffixed files — `X.md` (English,
  default), `X.pt-BR.md`, `X.es.md` — never per-language subfolders.
- **Structure.** Feature-first under `src/`: `src/app/` holds thin routes
  that only compose features; `src/features/<name>/` owns a page's or
  section's components, data, and lib; `src/shared/` holds code with no
  single feature owner (`components/`, `icons/`, `lib/`). Each feature
  exposes its public API through `index.ts`; reach into another feature's
  internals only through that barrel, never a deep import —
  `eslint.config.mjs`'s `import/no-restricted-paths` enforces this.
  See [docs/architecture.md](docs/architecture.md) for the full picture:
  dependency rules, rendering (what's a Server vs. Client Component and
  why), how the forms submit, and the reasoning behind SSG and
  feature-first.
- **Invariants — never break these:**
  - `GET /privacy-policy` returns 200 (linked from the app's settings and
    the Play Store listing).
  - `GET /contact` returns 200 with a working form (linked from the app's
    settings).
  - Neither route gets a locale prefix or redirect, even after
    internationalization is added.
- **Forms never send real email in tests.** `/contact` and `/download`
  submit through EmailJS in the browser. In any test, e2e spec, or `act`
  run, the request to `api.emailjs.com` is always intercepted or mocked —
  never sent for real.
- **Commit convention:** Conventional Commits. Scope is the area affected
  (`header`, `contact`, `deps`, `ci`), never a file path. Use `fix` for
  corrections (not `feat`), `build(deps)` for dependency updates. Body
  always explains what the commit adds or changes — never a bare subject
  line. Never `Co-Authored-By`.
- **Before shipping a change**, run the local gate for whatever scripts
  exist at the time (`pnpm lint`, `pnpm typecheck`, `pnpm build`, and later
  `pnpm test`, `pnpm test:e2e`, `pnpm verify` as the update plan adds
  them). Never run `git add`, `git commit`, or any branch/merge command —
  propose the Conventional Commit message and let the user commit it.
