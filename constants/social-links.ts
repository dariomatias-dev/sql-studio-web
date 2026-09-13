import { Mail } from "lucide-react";

import type { SocialLink } from "@/@types/social-link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/dariomatias-dev", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/dariomatias-dev/", icon: LinkedinIcon },
  { href: "mailto:matiasdario75@gmail.com", icon: Mail },
];
