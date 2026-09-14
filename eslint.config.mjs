import path from "node:path";

import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

// Resolves an except pattern to an absolute path.
const abs = (p) => path.resolve(import.meta.dirname, p);

// Add a feature here when you add one under src/features/.
const FEATURES = [
  "beta-access",
  "contact",
  "cta",
  "faq",
  "features-showcase",
  "hero",
  "layout",
  "legal",
  "screenshots",
  "workflow",
];

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Only .rules: eslint-config-next already registers the jsx-a11y plugin, re-registering it errors.
      ...jsxA11y.flatConfigs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/shared/**/*",
              from: "./src/features/**/*",
              message: "shared/ must not depend on features/. Move the shared piece down instead.",
            },
            // app/ composes features; it may only reach a feature's public
            // API (its index.ts barrel), never a file inside it.
            {
              target: "./src/app/**/*",
              from: "./src/features/**/*",
              except: [abs("./src/features/*/index.ts")],
              message: "Import from the feature's barrel (index.ts), not an internal file.",
            },
            // A feature may freely import its own files, but never reach
            // directly inside another feature.
            ...FEATURES.map((name) => ({
              target: `./src/features/${name}/**/*`,
              from: "./src/features/**/*",
              except: [abs(`./src/features/${name}/**/*`), abs("./src/features/*/index.ts")],
              message: "Import from the other feature's barrel (index.ts), not an internal file.",
            })),
          ],
        },
      ],
    },
  },
  {
    // Type-aware rules need the type checker, which is slow and only makes
    // sense for the app's own source; config files at the repo root stay on
    // the plain (non type-aware) parser from nextTs.
    files: ["src/**/*.{ts,tsx}", "e2e/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
  // Turn off ESLint formatting rules that conflict with Prettier. Must be last.
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
    "coverage/**",
  ]),
];

export default eslintConfig;
