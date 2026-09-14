import { Footer, Header } from "@/features/layout";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/lib/site";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className="bg-background text-foreground selection:text-primary-foreground antialiased selection:bg-[#00BCD4]">
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
