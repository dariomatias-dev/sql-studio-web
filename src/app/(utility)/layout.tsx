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

// Only Header/Footer render in this tree, so only their messages reach the client.
const { Nav, Header, Footer } = enMessages;
const headerFooterMessages = { Nav, Header, Footer };

// English-only tree for /contact, /privacy-policy, and /terms-of-service, which stay unprefixed.
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
