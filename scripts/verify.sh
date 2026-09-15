#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

FAST=false
for arg in "$@"; do
  case "$arg" in
    --fast) FAST=true ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

step() {
  echo
  echo "==> $1"
}

step "typecheck"
pnpm typecheck

step "lint"
pnpm lint

step "format:check"
pnpm format:check

step "check:docs-locales"
pnpm check:docs-locales

step "test:coverage"
pnpm test:coverage

if [ "$FAST" = true ]; then
  echo
  echo "==> build + test:e2e (skipped: --fast)"
  echo
  echo "verify --fast: all steps passed"
  exit 0
fi

step "build"
pnpm build

step "check:bundle-size"
pnpm check:bundle-size

step "test:e2e"
pnpm test:e2e

echo
echo "verify: all steps passed"
