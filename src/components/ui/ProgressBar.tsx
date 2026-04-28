import { memo } from "react";
import clsx from "clsx";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md";
  tone?: "default" | "inverted";
  className?: string;
  ariaLabel?: string;
}

/**
 * Themed progress bar. Encapsulates the inline width style so callers
 * don't reach into `style={{}}`.
 */
const ProgressBarBase = ({
  value,
  max = 100,
  size = "md",
  tone = "default",
  className,
  ariaLabel,
}: ProgressBarProps) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={clsx(
        "w-full rounded-full overflow-hidden",
        size === "sm" ? "h-1" : "h-2",
        tone === "inverted" ? "bg-primary-foreground/30" : "bg-muted",
        className,
      )}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-[width] duration-300 ease-out",
          tone === "inverted" ? "bg-primary-foreground" : "bg-foreground",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export const ProgressBar = memo(ProgressBarBase);
