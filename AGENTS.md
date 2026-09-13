<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation
notices.
<!-- END:nextjs-agent-rules -->

# Project rules

- **Language.** All code (identifiers, comments) and all user-facing text
  is in English. Repo documentation ships in three languages once it
  exists (`docs/`, root READMEs): flat, suffixed files — `X.md` (English,
  default), `X.pt-BR.md`, `X.es.md` — never per-language subfolders.
- **Structure (current, pre-refactor).** The app is still organized by
  technical layer at the repo root: `app/` (routes), `components/`,
  `constants/`, `context/`, `lib/`, `utils/`, `@types/`. This moves to a
  feature-first `src/features/<name>/` layout in a later step of the
  update plan; until then, keep new code consistent with the layer it
  belongs to today. Once the restructure lands, this file and
  `docs/architecture.md` describe the dependency rules.
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
