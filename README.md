<br>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
</div>
<br>

<p align="center">
<a href="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml"><img src="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
<a href="https://codecov.io/gh/dariomatias-dev/sql-studio-web"><img src="https://img.shields.io/codecov/c/github/dariomatias-dev/sql-studio-web" alt="Coverage"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/dariomatias-dev/sql-studio-web" alt="License"></a>
<img src="https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white" alt="Node.js version">
</p>

<p align="center">
<strong>Language:</strong> English | <a href="README.es.md">Español</a> | <a href="README.pt-BR.md">Português (Brasil)</a>
</p>

# <p align="center">SQL Studio — Official Website</p>

<p align="center">
Official website of the SQL Studio mobile app: a database client for practicing SQL on fully customizable local SQLite databases, offline-first.
<br>
<a href="#about-the-project"><strong>Explore the docs »</strong></a>
<br><br>
<a href="https://sql-studio.vercel.app/">View Live Site</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Report Bug</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Request Feature</a>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [Changelog](#changelog)
- [License](#license)
- [Author](#author)

## About the Project

This repository holds only the code for SQL Studio's official landing page —
not the mobile app itself. It's a static (SSG) site built with Next.js,
showcasing the app's features, screenshots, and a way to request access
while the app is in closed beta.

SQL Studio itself is a mobile app for practicing SQL entirely offline, using
SQLite as its storage engine — create, edit, run, and inspect queries
against fully customizable local databases, no internet connection needed.

## Features

- Feature showcase, screenshots carousel, workflow walkthrough, and FAQ on the home page.
- A beta-access request form for `/download`, since the app is currently in closed beta on Google Play.
- A contact form for support, bug reports, and feature requests.
- Real privacy policy and terms of service pages, linked from the app itself.
- Honeypot and minimum-fill-time spam guards on both forms.
- Accessible by default: correct heading hierarchy, `aria-*` on forms and icons, keyboard-navigable carousel, `prefers-reduced-motion` respected, verified with axe.
- SEO: per-page metadata, sitemap, robots, a generated Open Graph image, and `MobileApplication` JSON-LD.
- Security headers and a Content Security Policy.

## Tech Stack

- Next.js (App Router), React, and TypeScript in strict mode.
- Tailwind CSS v4.
- `react-hook-form` with a `zod` resolver for the contact form.
- `embla-carousel-react` for the screenshots carousel, Radix UI for the accordion and mobile menu dialog.
- `@emailjs/browser` — forms submit directly from the browser, no backend of our own.
- Vitest with Testing Library, and Playwright with axe.
- ESLint, Prettier, Husky, commitlint, and GitHub Actions.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # set the EmailJS credentials to enable the forms
pnpm run dev                  # http://localhost:3000
```

Without the EmailJS environment variables, both forms still render — they
just show a friendly error instead of sending.

## Scripts

| Command                      | Description                      |
| ---------------------------- | -------------------------------- |
| `pnpm run dev`               | Development server               |
| `pnpm run build`             | Production build (SSG)           |
| `pnpm run start`             | Serve the production build       |
| `pnpm run lint`              | ESLint                           |
| `pnpm run typecheck`         | `tsc --noEmit`                   |
| `pnpm run format`            | Prettier (write)                 |
| `pnpm run test`              | Vitest (watch)                   |
| `pnpm run test:run`          | Vitest (single run)              |
| `pnpm run test:coverage`     | Vitest with coverage thresholds  |
| `pnpm run test:e2e`          | Playwright (smoke, forms, a11y)  |
| `pnpm run check:bundle-size` | Per-route JS budget check        |
| `pnpm run verify`            | The full local gate, in CI order |
| `pnpm run lighthouse`        | Lighthouse CI (report only)      |

## Architecture

The codebase is organized feature-first under `src/features/*`, with only
genuinely shared code in `src/shared/*`. See
[docs/architecture.md](docs/architecture.md) for the dependency rules and
the rendering strategy (what's a Server vs. a Client Component, and why).

## Testing

- Unit and component tests with Vitest and Testing Library (`pnpm run test:run`).
- End-to-end tests with Playwright, including axe accessibility scans (`pnpm run test:e2e`).
- Forms never send real email in any test — EmailJS requests are always intercepted or mocked. See [docs/testing.md](docs/testing.md).

## Documentation

| Doc                                                | Covers                                                |
| -------------------------------------------------- | ----------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)       | Feature-first structure, rendering, forms             |
| [docs/testing.md](docs/testing.md)                 | What merits a test, the EmailJS mocking rule          |
| [docs/ci.md](docs/ci.md)                           | Every CI job, gate vs. report, reproducing with `act` |
| [docs/dependencies.md](docs/dependencies.md)       | Exact-pinned packages, `pnpm.overrides`, Renovate     |
| [docs/performance.md](docs/performance.md)         | The bundle-size budget and Lighthouse CI              |
| [docs/security.md](docs/security.md)               | Threat scope and how to report a vulnerability        |
| [docs/contributing.md](docs/contributing.md)       | Setup, the local gate, commit and branch conventions  |
| [docs/code_of_conduct.md](docs/code_of_conduct.md) | The Contributor Covenant this project follows         |

## Contributing

Contributions make the open-source community an amazing place to learn and
create. Any contribution is appreciated.

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`.
3. Run the local gate before committing: `pnpm run verify`.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m 'feat(contact): add AmazingFeature'`.
5. Push to the branch: `git push origin feature/AmazingFeature`.
6. Open a pull request.

See [docs/contributing.md](docs/contributing.md) for the full setup and
gate details. This project follows the
[Contributor Covenant](docs/code_of_conduct.md).

## Security

Found a vulnerability? Please don't open a public issue. See
[docs/security.md](docs/security.md) for how to report it privately.

## Changelog

Releases are versioned automatically:
[release-please](https://github.com/googleapis/release-please) keeps a
standing pull request with `CHANGELOG.md` and the `package.json` version
bump, cutting a tagged GitHub release when it's merged.

## License

Distributed under the **MIT License**. See the [LICENSE](LICENSE) file for
details.

## Author

Developed by **Dário Matias**:

- Portfolio: [https://dariomatias-dev.com](https://dariomatias-dev.com)
- GitHub: [https://github.com/dariomatias-dev](https://github.com/dariomatias-dev)
- Email: [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com)
- Instagram: [https://instagram.com/dariomatias_dev](https://instagram.com/dariomatias_dev)
- LinkedIn: [https://linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
