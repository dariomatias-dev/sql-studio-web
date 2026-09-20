import { setRequestLocale } from "next-intl/server";

import { SiteShell } from "@/features/layout";
import { baseMetadata } from "@/shared/lib/page-metadata";

import enMessages from "../../../messages/en.json";

import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = baseMetadata;

interface UtilityLayoutProps {
  children: React.ReactNode;
}

// Only Header/Footer render in this tree, so only their messages ship to the
// client: not the full catalog (Hero, Features, Faq, ...) these pages never use.
const { Nav, Header, Footer } = enMessages;
const headerFooterMessages = { Nav, Header, Footer };

// /contact, /privacy-policy, and /terms-of-service never gain a locale
// prefix or redirect (see AGENTS.md invariants), so this tree stays
// hardcoded to English, with no dynamic locale resolution.
const UtilityLayout = ({ children }: UtilityLayoutProps) => {
  setRequestLocale("en");

  return (
    <html lang="en">
      <body className="bg-background text-foreground selection:text-primary-foreground selection:bg-brand antialiased">
        <SiteShell locale="en" messages={headerFooterMessages}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
};

export default UtilityLayout;
