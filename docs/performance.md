# Performance

Two automated checks watch performance: a hard bundle-size budget per
route, and Lighthouse CI, which reports without gating yet.

## Bundle size budget

`scripts/check-bundle-size.mjs` reads a real `next build` output: for each
route it checks, it parses that route's prerendered HTML for every
`<script src="/_next/static/chunks/*.js">` tag, sums the real on-disk size
of those files, and fails if the total exceeds the route's budget. Run it
with `pnpm run check:bundle-size` (it's part of `pnpm run verify` and the
CI `build` job, right after `next build`).

This measures per-route static output directly instead of parsing Next's
internal client-reference-manifest format, which isn't a stable contract
to depend on.

### Current budgets

| Route               | Budget   | Measured at last review |
| ------------------- | -------- | ----------------------- |
| `/contact`          | 1,240 KB | ~1,218.3 KB             |
| `/download`         | 1,210 KB | ~1,183.9 KB             |
| `/privacy-policy`   | 1,200 KB | ~1,174.6 KB             |
| `/terms-of-service` | 1,200 KB | ~1,174.6 KB             |

`/` has no budget: since [E89](../plan.md) it's server-rendered on demand
rather than prerendered to static HTML (see the E89 notes for why), so
there's no `<script src>`-bearing HTML file for this script to measure:
`next-intl`'s locale detection couldn't be made to fully statically
render the home page in this Next.js version, and that's tracked as a
follow-up rather than solved here.

These are a **floor against regressing past the measured baseline**, not a
target: same philosophy as the Vitest coverage thresholds in
`vitest.config.mts`. Lowering a budget is a deliberate choice that needs a
measurement to back it, same as raising one.

### What's actually in that weight

Every route's baseline jumped by roughly 370 KB at E89: `next-intl`'s
client runtime (locale/message context, ICU message formatting) is now
part of the shared framework chunk, since `Header`/`Footer`, rendered on
every route, read their labels through it. `/contact` is the heaviest
route: it ships `react-hook-form` and its zod resolver for the contact
form, on top of that shared baseline (React, React DOM, the Next.js
runtime, `next-intl`, `embla-carousel-react` used by the home page's
screenshots carousel). `/download` is lighter since its form uses plain
`useState`, no form library. The legal pages (`/privacy-policy`,
`/terms-of-service`) ship no form code at all: their weight is close to
that shared baseline, since neither page has a client-side island of its
own beyond `Header`/`Footer`.

Budgets were raised again when `Header` gained a language switcher built
on `@radix-ui/react-dropdown-menu` (~15 KB/route, since `Header` is part
of the shared chunk on every route).

## Lighthouse CI

`lighthouserc.json` runs Lighthouse three times each against all 5 routes,
on a real `next start` server. `pnpm run lighthouse` runs it locally; CI
runs it in a dedicated `lighthouse` job that downloads the `build` job's
artifact instead of rebuilding.

Every assertion in `lighthouserc.json` is `"warn"`, not `"error"`: it
reports a score without failing the job or the pipeline. This is
deliberate: the intent is to report for a while, confirm the numbers hold
steady across real commits (Lighthouse scores have natural run-to-run
noise), and only then consider flipping the categories that matter to
`"error"` in a follow-up change.
