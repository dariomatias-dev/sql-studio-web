// Checks that docs/*.md, docs/*.pt-BR.md, and docs/*.es.md share the same set of
// documents and heading structure (levels, in order), not heading text.
// Run as a CLI or import checkDocsLocales().

import fs from "node:fs";
import path from "node:path";

const LOCALE_SUFFIXES = { en: "", "pt-BR": ".pt-BR", es: ".es" };
const HEADING = /^(#{1,6})\s+\S/;

function baseDocNames(docsDir) {
  if (!fs.existsSync(docsDir)) return [];
  const names = new Set();
  for (const entry of fs.readdirSync(docsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const withoutExt = entry.name.slice(0, -".md".length);
    const base = withoutExt.replace(/\.(pt-BR|es)$/, "");
    names.add(base);
  }
  return [...names].sort();
}

function headingShape(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const shape = [];
  for (const line of lines) {
    const match = line.match(HEADING);
    if (match) shape.push(match[1].length);
  }
  return shape;
}

export function checkDocsLocales({ docsDir }) {
  const errors = [];
  const baseNames = baseDocNames(docsDir);

  for (const base of baseNames) {
    const missing = Object.entries(LOCALE_SUFFIXES)
      .filter(([, suffix]) => !fs.existsSync(path.join(docsDir, `${base}${suffix}.md`)))
      .map(([locale]) => locale);
    if (missing.length > 0) {
      errors.push(`${base}.md: missing for locale(s) ${missing.join(", ")}`);
      continue;
    }

    const shapes = Object.entries(LOCALE_SUFFIXES).map(([locale, suffix]) => ({
      locale,
      shape: headingShape(path.join(docsDir, `${base}${suffix}.md`)),
    }));
    const [reference, ...rest] = shapes;
    for (const other of rest) {
      if (JSON.stringify(other.shape) !== JSON.stringify(reference.shape)) {
        errors.push(
          `${base}.md: section structure differs between ${reference.locale} ` +
            `(${reference.shape.join(",") || "no headings"}) and ${other.locale} ` +
            `(${other.shape.join(",") || "no headings"})`,
        );
      }
    }
  }

  return { errors };
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
  const { errors } = checkDocsLocales({ docsDir: path.join(process.cwd(), "docs") });

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} docs locale-parity problem(s):\n`);
    for (const error of errors) console.error(`  ${error}`);
    console.error("");
    process.exit(1);
  }

  console.log("✓ docs/*.md, docs/*.pt-BR.md and docs/*.es.md are in parity.");
}
