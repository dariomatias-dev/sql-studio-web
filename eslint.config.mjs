import path from "node:path";

import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

const abs = (p) => path.resolve(import.meta.dirname, p);

// Add a feature here when you add one under src/features/.
const FEATURES = [
  "beta-access",
  "contact",
  "cta",
  "database-catalog",
  "faq",
  "features-showcase",
  "hero",
  "languages",
  "layout",
  "legal",
  "open-source",
  "screenshots",
  "whats-new",
  "workflow",
];

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
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
            // app/ may only import a feature through its index.ts barrel.
            {
              target: "./src/app/**/*",
              from: "./src/features/**/*",
              except: [abs("./src/features/*/index.ts")],
              message: "Import from the feature's barrel (index.ts), not an internal file.",
            },
            // A feature may not import another feature's internals.
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
    // Type-aware rules for the app's own source only.
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
  // Must be last.
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
