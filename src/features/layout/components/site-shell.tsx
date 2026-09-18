import { NextIntlClientProvider } from "next-intl";

import { jsonLd } from "@/shared/lib/json-ld";
import {
  APP_REPOSITORY_URL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/shared/lib/site";

import { Footer } from "./footer";
import { Header } from "./header";

interface SiteShellProps {
  locale: string;
  messages: Record<string, unknown>;
  children: React.ReactNode;
}

export const SiteShell = ({ locale, messages, children }: SiteShellProps) => (
  <>
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

    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>

      <Footer />
    </NextIntlClientProvider>
  </>
);
