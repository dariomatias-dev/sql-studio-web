# Dependencies

## Exact-pinned dependencies

Most dependencies in `package.json` use a caret range. These four don't:

- **`next`, `eslint-config-next`**: always bumped together, in the same
  commit. `eslint-config-next`'s rules are generated against a specific
  Next.js release and aren't guaranteed compatible across versions.
- **`react`, `react-dom`**: bumped together with each other. A caret range
  here could pull in a React version ahead of what the pinned `next`
  release was built and tested against.

## `pnpm.overrides`

`pnpm audit` flags vulnerabilities in transitive dependencies: packages
this project never installs directly, pulled in by `eslint-config-next`,
`@commitlint/cli`, and similar dev tooling. `pnpm.overrides` in
`package.json` forces just those packages to a patched version, without
touching what actually gets shipped to the site.

Each override targets one major line at a time
(`"<package>@<range>": "<version>"`), not the bare package name, when more
than one major version of it is in use by different transitive chains:
forcing every consumer to the same major could break whichever one was
written against the older API.

As of 2026-09-13, after Bloco 4's package updates, `pnpm audit` still
flagged these as **high**:

| Package                 | Override             | Patched version | Pulled in by                                               |
| ----------------------- | -------------------- | --------------- | ---------------------------------------------------------- |
| `minimatch` (3.x line)  | `minimatch@^3`       | `3.1.5`         | `eslint` → `glob` (older major)                            |
| `minimatch` (9.x line)  | `minimatch@^9`       | `9.0.9`         | `eslint-config-next` → `@typescript-eslint/*`              |
| `flatted`               | `flatted`            | `3.4.4`         | `eslint-config-next` → `@typescript-eslint/*`              |
| `picomatch` (2.x line)  | `picomatch@^2`       | `2.3.2`         | `eslint-config-next` → `@next/eslint-plugin-next`          |
| `picomatch` (4.x line)  | `picomatch@^4`       | `4.0.7`         | `eslint-config-next` → `eslint-import-resolver-typescript` |
| `brace-expansion` (1.x) | `brace-expansion@^1` | `1.1.18`        | `eslint-config-next` → `@typescript-eslint/*`              |
| `brace-expansion` (2.x) | `brace-expansion@^2` | `2.1.4`         | same, a different major in the same tree                   |
| `js-yaml`               | `js-yaml@^4`         | `4.3.2`         | `@commitlint/cli` → `cosmiconfig`                          |
| `browserslist`          | `browserslist`       | `4.28.9`        | `eslint-config-next` → `@babel/core`                       |

This cleared every `high`/`critical` advisory (`pnpm audit`: 30 → 3).
The 3 remaining are `moderate`/`low`, all inside `eslint`'s own dependency
tree (`ajv`, `@humanfs/node`, `@babel/core`), out of scope for this pass:
see the `vulnerabilities` CI job for the standing report.

**Removing an override:** once the package it targets updates transitively
(a newer `eslint-config-next`, a newer `@commitlint/cli`) to a version that
already includes the fix, `pnpm audit` stops flagging it and the override
becomes a no-op. Safe to delete at that point: verify with
`pnpm why <package>` that the installed version already meets the override
target on its own.

## Renovate

`renovate.json` opens a PR for outdated dependencies weekly (Monday before
6am, `America/Sao_Paulo`), prefixing commits with `build(deps):` and
labeling PRs `dependencies`.

Disabled entirely for `next`, `eslint-config-next`, `react`, `react-dom`:
these four are bumped by hand, together, in one commit (see "Exact-pinned
dependencies" above); a caret range or an automated PR touching just one of
them risks a version combination nobody tested. `@types/react` and
`@types/react-dom` are grouped into a single `react-types` PR instead of
disabled, since they only type whichever React is pinned and don't need
the same hand-coordination. GitHub Actions minor/patch bumps are grouped
into one PR to cut noise; major bumps still open individually.

**Triaging a Renovate PR:**

1. Check the PR is one of the grouped/expected kinds (`react-types`,
   `github-actions`, or a single-package bump): an unexpected package
   showing up usually means a `packageRules` match needs updating.
2. Let CI run (`quality`, `unit`, `build`, `e2e`); a green run is normally
   enough to merge a patch/minor bump.
3. For a major bump, skim the package's changelog for breaking changes
   before merging, even if CI is green: Renovate doesn't know about
   runtime-only breakage (e.g. a removed CSS class, a changed default).
