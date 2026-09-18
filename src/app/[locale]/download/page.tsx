import { BetaAccessPageContent } from "@/features/beta-access";
import { pageMetadata } from "@/shared/lib/page-metadata";

import type { Metadata } from "next";

interface DownloadPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: DownloadPageProps): Promise<Metadata> => {
  const { locale } = await params;
  return pageMetadata({
    title: "Download",
    description:
      "SQL Studio is in closed beta. Request access with your Google Play email to get invited.",
    path: "/download",
    locale,
  });
};

export default BetaAccessPageContent;
