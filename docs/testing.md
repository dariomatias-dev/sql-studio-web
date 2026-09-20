# Testing

## What actually merits a test here

Coverage is a floor, not a goal. See the thresholds and their rationale in
`vitest.config.mts`. What matters more than the number is _what_ to test:

- **Real logic**: a computation, a branch, a piece of state that can be
  wrong. The contact form's zod schema, the header's solid/transparent
  state and mobile menu, the FAQ accordion's expand/collapse, the
  carousel's active slide: all worth a test.
- **Real user interaction**: click something, expect a specific outcome.
  Component tests here render the real component and interact with it
  through Testing Library queries (`getByRole`, `getByLabelText`), not by
  reaching into internals.
- **Form submission outcomes**: a valid submission calls the right
  function with the right payload and shows success; an invalid one blocks
  submission and shows the field errors; a failure shows the error state.
  `sendEmail`/`emailjs.send` are always mocked: see the "never send real
  email in tests" rule in `AGENTS.md`.
- **Link targets**: every button or link that points somewhere external
  (GitHub, LinkedIn, mailto, the legal pages) is worth asserting on: it's
  exactly the kind of thing a copy-paste error breaks silently.

What's deliberately **not** chased, and excluded from coverage in
`vitest.config.mts`:

- **Static sections with no branches**: `cta-section.tsx`,
  `features-section.tsx`, `hero-section.tsx`, `workflow-section.tsx`, the
  two `*-section.tsx` wrapper components (`faq`, `screenshots`), and the
  two legal page contents. Hardcoded markup with no props and no
  conditional rendering: there's no logic to get wrong. Covered for real
  by `e2e/smoke.spec.ts` and `e2e/navigation.spec.ts` instead.
- **Plain data objects**: `features/layout/data/{nav-links,social-links}.ts`
  and `features/faq/data/faqs.ts`. Nothing to branch on (`faqs.ts` is
  exercised indirectly through `faq-section.test.tsx` anyway).
- **shadcn/Radix primitives** (`shared/components/ui/**`): styling only, no
  logic of our own.
- **`*-page-content.tsx` files**: pure composition of static copy plus an
  already-tested form component (`ContactForm`, `BetaAccessForm`). No
  logic of their own.
- **Brand icon SVGs** (`shared/icons/**`): a `<svg>` with a fixed path,
  nothing to branch on.

## Known gaps, not exclusions

These stay counted against the coverage floor, on purpose, so fixing them
raises the number instead of quietly being forgotten:

- **`ping-indicator.tsx`**'s `glow` prop branch: only ever rendered with
  its default in the pages that use it so far.
- **A couple of branches in `contact-form.tsx` and
  `screenshots-carousel.tsx`**: less common field-error combinations and
  the `priority` calculation on far-off slides.

## Test doubles

- **jsdom gaps are real and worth a comment, not a workaround.**
  `IntersectionObserver`, `ResizeObserver`, and `matchMedia` don't exist in
  jsdom at all; see the polyfills in `vitest.setup.ts`: `embla-carousel`
  (the screenshots carousel) needs `ResizeObserver`. The other two aren't
  exercised by any component yet but are polyfilled ahead of time, matching
  what a real browser provides.
- **embla-carousel works in jsdom without real layout**, at least for this
  carousel: every slide is the same (zero) size when `getBoundingClientRect`
  is unavailable, so its snap-point calculation still resolves correctly.
  `screenshots-carousel.test.tsx` asserts real navigation (next/previous
  buttons, clicking a dot) directly, no e2e-only carve-out needed.
- **Radix Accordion unmounts closed content**, it doesn't just hide it:
  `faq-section.test.tsx` asserts a collapsed answer's absence with
  `queryByText(...)` returning `null`, not a `data-state="closed"`
  attribute on an element that isn't there.

## Running the suites

```bash
pnpm test               # Vitest in watch mode
pnpm run test:run       # Vitest once
pnpm run test:coverage  # Vitest once, with the coverage thresholds enforced
pnpm run test:e2e       # Playwright, against a built app
```
