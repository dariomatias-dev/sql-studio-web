# Continuous Integration

Two principles run through every workflow here:

1. **A gate and a report are different thing.** What actually fails a pull
   request lives in this repository (a script, a threshold): never only in
   an external service, so a fork PR without a secret configured never
   gets blocked over a missing token.
2. **The local gate mirrors CI.** `pnpm run verify` runs the same checks
   `ci.yml` runs, in the same order (`typecheck` → `lint` →
   `format:check` → `test:coverage` → `build` → `test:e2e`; `--fast` skips
   `build` and `test:e2e`). A green local run should mean a green CI run.

## `.github/workflows/ci.yml`

| Job               | Checks                                                                                | Gate or report?                          |
| ----------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| `commit-lint`     | PR title against Conventional Commits (pull requests only)                            | Gate, blocks merge                       |
| `quality`         | format, lint, types                                                                   | Gate, blocks merge                       |
| `unit`            | Vitest with coverage thresholds, then a Codecov upload                                | Tests gate; the upload is report only    |
| `build`           | `next build`                                                                          | Gate, blocks merge                       |
| `e2e`             | Playwright (smoke, navigation, app integration, no-js; desktop and a mobile viewport) | Gate, blocks merge                       |
| `vulnerabilities` | `pnpm audit`, `osv-scanner` against the lockfile, `gitleaks` for committed secrets    | Report only, never blocks a PR           |
| `lighthouse`      | Lighthouse (performance, accessibility, SEO, best practices) against all 5 routes     | Report only, every assertion is `"warn"` |

`build` uploads `.next` as an artifact; `e2e` and `lighthouse` both
download it instead of rebuilding, so the app is built exactly once per
run.

The `vulnerabilities` and `lighthouse` jobs are deliberately non-blocking:
a new high-severity advisory in an unrelated dev-tooling dependency
shouldn't hold every unrelated PR hostage until someone bumps a package
they don't directly control, and Lighthouse scores have real run-to-run
noise.

## Other workflows

- **`codeql.yml`**: static analysis (JavaScript/TypeScript), on every PR,
  every push to `main`, and a weekly schedule so a query-pack update
  surfaces something even in a quiet week. Gates via GitHub's code
  scanning check.
- **`dependency-review.yml`**: on every PR, fails only on a _newly
  introduced_ high-or-above severity advisory or a license outside the
  allow-list; an advisory already on `main` doesn't retroactively block an
  unrelated PR (that's what the `vulnerabilities` job reports on instead).
- **`release-please.yml`**: on push to `main`, keeps a standing release
  pull request with `CHANGELOG.md` and the `package.json` version bump.

## Reproducing CI locally with `act`

```bash
act -l               # list the jobs and their dependency order
act -j quality        # run one job
```

`commit-lint`, `quality`, `unit`, and `vulnerabilities` run cleanly under
`act`. The rest have documented limits:

- **`build` and `e2e`** need `act`'s local artifact server explicitly
  enabled — without it, `actions/upload-artifact` and
  `actions/download-artifact` fail with "Unable to get the
  ACTIONS_RUNTIME_TOKEN env variable":

  ```bash
  act -j build --artifact-server-path /tmp/artifacts
  act -j e2e --artifact-server-path /tmp/artifacts
  ```

- **`lighthouse`** downloads the build artifact fine under `act`, but
  fails the Chrome healthcheck ("Chrome installation not found") — the
  minimal `catthehacker/ubuntu:act-latest` image doesn't ship Chrome. It
  only runs for real on an actual `ubuntu-latest` GitHub-hosted runner,
  which does; `continue-on-error` keeps this from failing the job locally
  either way. `pnpm run lighthouse` runs the same checks directly against
  a local build, without `act`, as a substitute during development.
- **`codeql.yml`**'s `analyze` job runs the full scan locally under `act`
  (all query packs, every source file) and only fails at the very last
  step, uploading the SARIF result to GitHub's code scanning API — which
  doesn't exist for a workflow run that was never dispatched by GitHub.
  That failure is expected locally and says nothing about the scan
  itself.
- **`dependency-review.yml`** and **`release-please.yml`** both need a
  real pull request or a real `main` branch on GitHub to do anything
  useful (a PR's dependency diff; the config file fetched from the remote
  branch) — under `act` they fail immediately with a missing PR number or
  a missing remote config file. Both are otherwise validated statically
  (`act -l`, JSON/YAML parsing, the vendor's own config validator where
  one exists).

Whichever job you run under `act`, don't run the `unit` job's Codecov
upload step without `CODECOV_TOKEN` set unless you mean to: the Codecov
CLI accepts anonymous uploads and will publish real coverage data to the
public Codecov project for this repository.

## Debugging a failed e2e run

`playwright.config.ts` sets `trace: "retain-on-failure"`; a failed CI run
uploads `playwright-report/` and `test-results/` as an artifact (see the
`e2e` job's "Upload Playwright report" step). Download it, then:

```bash
npx playwright show-trace path/to/trace.zip
```

That opens a timeline with a screenshot, the DOM, and network activity at
the point of failure, usually faster than trying to reproduce a
CI-only failure by re-reading the assertion.
