import { APP_REPOSITORY_URL } from "@/shared/lib/site";

export interface OpenSourceLink {
  href: string;
  /** Key into the "Footer" message namespace. */
  labelKey: string;
}

export const openSourceLinks: OpenSourceLink[] = [
  { href: APP_REPOSITORY_URL, labelKey: "sourceCode" },
  { href: `${APP_REPOSITORY_URL}/issues`, labelKey: "issues" },
  {
    href: `${APP_REPOSITORY_URL}/blob/main/docs/contributing.md`,
    labelKey: "contributingGuide",
  },
];
