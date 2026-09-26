export interface LegalNavLink {
  href: string;
  /** Key into the "Footer" message namespace. */
  labelKey: string;
}

export const legalNavLinks: LegalNavLink[] = [
  { href: "/privacy-policy", labelKey: "privacyPolicy" },
  { href: "/terms-of-service", labelKey: "termsOfService" },
  { href: "/contact", labelKey: "contactSupport" },
];
