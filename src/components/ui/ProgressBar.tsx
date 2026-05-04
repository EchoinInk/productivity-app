import { memo } from "react";
import clsx from "clsx";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "muted";
  className?: string;
  ariaLabel?: string;
}

const ProgressBarBase = ({
  value,
  max = 100,
  size = "md",
  variant = "gradient",
  className,
  ariaLabel,
}: ProgressBarProps) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  const sizeClass = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const trackClass = {
    default: "bg-surface-elevated",
    gradient: "bg-surface-elevated",
    muted: "bg-surface-elevated",
  };

  const fillClass = {
    default: "bg-primary",
    gradient: "bg-gradient-primary",
    muted: "bg-text-muted",
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={clsx(
        "w-full rounded-full overflow-hidden",
        sizeClass[size],
        trackClass[variant],
        className,
      )}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          fillClass[variant],
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export const ProgressBar = memo(ProgressBarBase);
