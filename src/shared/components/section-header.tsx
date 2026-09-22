import { Reveal } from "@/shared/components/reveal";
import { cn } from "@/shared/lib/cn";

interface SectionHeaderProps {
  variant?: "light" | "dark";
  badge: React.ReactNode;
  title: React.ReactNode;
  titleClassName?: string;
  description: React.ReactNode;
  descriptionClassName?: string;
  className: string;
}

export const SectionHeader = ({
  variant = "light",
  badge,
  title,
  titleClassName,
  description,
  descriptionClassName,
  className,
}: SectionHeaderProps) => (
  <Reveal className={className}>
    <div
      className={cn(
        "mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase",
        variant === "dark"
          ? "border-white/10 bg-zinc-900/50 text-zinc-300"
          : "border-brand/30 bg-brand/5 text-cyan-700",
      )}
    >
      {badge}
    </div>
    <h2
      className={cn(
        "mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl",
        variant === "dark" ? "text-white" : "text-slate-900",
        titleClassName,
      )}
    >
      {title}
    </h2>
    <p
      className={cn(
        "text-lg leading-relaxed font-light",
        variant === "dark" ? "text-zinc-400" : "text-slate-500",
        descriptionClassName,
      )}
    >
      {description}
    </p>
  </Reveal>
);
