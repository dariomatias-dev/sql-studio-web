import { SITE_NAME } from "./site";

import type { Metadata } from "next";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

// A route's own openGraph/twitter replaces the layout's wholesale, so type/siteName repeat here too.
export const pageMetadata = ({ title, description, path }: PageMetadataInput): Metadata => {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
};
