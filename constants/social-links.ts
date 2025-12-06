import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import { SocialLink } from "@/@types/social-link";

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/dariomatias-dev", icon: FaGithub },
  { href: "https://www.linkedin.com/in/dariomatias-dev/", icon: FaLinkedin },
  { href: "mailto:matiasdario75@gmail.com", icon: FaEnvelope },
];
