import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/shared/icons";

import type { SocialLink } from "./social-link.types";

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/dariomatias-dev", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/dariomatias-dev/", icon: LinkedinIcon },
  { href: "mailto:matiasdario75@gmail.com", icon: Mail },
];
