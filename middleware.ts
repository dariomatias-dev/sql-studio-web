import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

// privacy-policy/contact/terms-of-service never get a locale prefix or redirect (AGENTS.md invariants);
// opengraph-image is excluded bare and locale-prefixed so its own redirect doesn't 404 the image.
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|privacy-policy|contact|terms-of-service|favicon.ico|icon.png|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|(?:en|pt-BR|es)/opengraph-image|.*\\..*).*)",
  ],
};
