import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { SiteShell } from "@/features/layout";
import { routing } from "@/i18n/routing";
import { baseMetadata } from "@/shared/lib/page-metadata";

import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import ptBrMessages from "../../../messages/pt-BR.json";

import type { Metadata } from "next";

import "../globals.css";

const MESSAGES_BY_LOCALE: Record<string, Record<string, unknown>> = {
  en: enMessages,
  "pt-BR": ptBrMessages,
  es: esMessages,
};

export const metadata: Metadata = baseMetadata;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = MESSAGES_BY_LOCALE[locale];

  return (
    <html lang={locale}>
      <body className="bg-background text-foreground selection:text-primary-foreground selection:bg-brand antialiased">
        <SiteShell locale={locale} messages={messages}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
};

export default LocaleLayout;
