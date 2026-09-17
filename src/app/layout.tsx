import { Footer, Header } from "@/features/layout";
import { jsonLd } from "@/shared/lib/json-ld";
import {
  APP_REPOSITORY_URL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/shared/lib/site";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className="bg-background text-foreground selection:text-primary-foreground selection:bg-brand antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              operatingSystem: "Android",
              applicationCategory: "DeveloperApplication",
              url: SITE_URL,
              license: "https://opensource.org/licenses/MIT",
              codeRepository: APP_REPOSITORY_URL,
              author: {
                "@type": "Person",
                name: "Dário Matias",
                url: GITHUB_URL,
              },
            }),
          }}
        />

        <a
          href="#main-content"
          className="bg-brand focus:ring-brand fixed top-4 left-4 z-100 -translate-y-24 rounded-lg px-4 py-2 font-semibold text-black transition-transform focus:translate-y-0 focus:ring-4 focus:outline-none"
        >
          Skip to content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
