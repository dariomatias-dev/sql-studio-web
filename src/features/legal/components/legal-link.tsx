interface LegalLinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

export const LegalLink = ({ href, external = true, children }: LegalLinkProps) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
  >
    {children}
  </a>
);
