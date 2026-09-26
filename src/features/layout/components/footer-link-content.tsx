import { ChevronRight } from "lucide-react";

interface FooterLinkContentProps {
  children: React.ReactNode;
}

export const FooterLinkContent = ({ children }: FooterLinkContentProps) => (
  <>
    <ChevronRight className="text-brand mr-0 h-2.5 w-0 opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
    <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
  </>
);
