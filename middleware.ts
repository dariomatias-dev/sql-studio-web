import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

// Locale routing; the legal and contact routes and metadata files are excluded.
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|privacy-policy|contact|terms-of-service|favicon.ico|icon.png|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|(?:en|pt-BR|es)/opengraph-image|.*\\..*).*)",
  ],
};
