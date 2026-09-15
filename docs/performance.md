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

| Route               | Budget | Measured at last review |
| ------------------- | ------ | ----------------------- |
| `/`                 | 720 KB | ~690.7 KB               |
| `/contact`          | 820 KB | ~798.2 KB               |
| `/download`         | 690 KB | ~663.5 KB               |
| `/privacy-policy`   | 680 KB | ~652.9 KB               |
| `/terms-of-service` | 680 KB | ~652.9 KB               |

These are a **floor against regressing past the measured baseline**, not a
target: same philosophy as the Vitest coverage thresholds in
`vitest.config.mts`. Lowering a budget is a deliberate choice that needs a
measurement to back it, same as raising one.

### What's actually in that weight

`/contact` is the heaviest route: it ships `react-hook-form` and its zod
resolver for the contact form, on top of the shared framework baseline
(React, React DOM, the Next.js runtime, `embla-carousel-react` used by the
home page's screenshots carousel). `/download` is lighter since its form
uses plain `useState`, no form library. The legal pages
(`/privacy-policy`, `/terms-of-service`) ship no form code at all — their
weight is close to pure framework baseline, since neither page has a
client-side island of its own beyond the shared `Header`/`Footer`.

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
