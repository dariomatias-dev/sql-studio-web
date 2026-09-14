import { cn } from "@/shared/lib/cn";

interface PingIndicatorProps {
  size?: number;
  color?: string;
  className?: string;
  glow?: boolean;
}

export const PingIndicator = ({
  size = 8,
  color = "#00BCD4",
  className,
  glow = true,
}: PingIndicatorProps) => {
  const common = `rounded-full`;
  const px = `${size}px`;

  return (
    <span
      aria-hidden="true"
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: px, height: px }}
    >
      <span
        className={cn("absolute inline-flex h-full w-full animate-ping opacity-75", common)}
        style={{ backgroundColor: color }}
      />

      <span
        className={cn("relative inline-flex", glow && "shadow-[0_0_10px]", common)}
        style={{
          width: px,
          height: px,
          backgroundColor: color,
          boxShadow: glow ? `0 0 10px ${color}` : "none",
        }}
      />
    </span>
  );
};
