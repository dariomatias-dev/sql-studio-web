"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
  es: "Español",
};

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
  className?: string;
  onNavigate?: () => void;
}

export const LanguageSwitcher = ({
  variant = "light",
  className,
  onNavigate,
}: LanguageSwitcherProps) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Change language"
        className={cn(
          "focus-visible:ring-brand flex items-center gap-1.5 rounded-full p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
          variant === "dark"
            ? "text-zinc-300 hover:text-white"
            : "text-slate-600 hover:text-slate-900",
          className,
        )}
      >
        <Globe className="h-5 w-5" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 min-w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
        >
          {routing.locales.map((l) => (
            <DropdownMenu.Item key={l} asChild onSelect={onNavigate}>
              <Link
                href={pathname}
                locale={l}
                className="hover:bg-brand/5 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none"
              >
                {LOCALE_LABELS[l]}
                {l === locale && <Check className="text-brand h-4 w-4" />}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
