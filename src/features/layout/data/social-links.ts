import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/shared/icons";
import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/shared/lib/site";

import type { SocialLink } from "./social-link.types";

export const socialLinks: SocialLink[] = [
  { href: GITHUB_URL, icon: GithubIcon, label: "GitHub" },
  { href: LINKEDIN_URL, icon: LinkedinIcon, label: "LinkedIn" },
  { href: `mailto:${SITE_EMAIL}`, icon: Mail, label: "Email" },
];
