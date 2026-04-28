import { forwardRef, type HTMLAttributes } from "react";
import clsx from "clsx";

type SurfaceVariant = "glass" | "elevated";
type SurfacePadding = "none" | "sm" | "md" | "lg";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  padding?: SurfacePadding;
  as?: "div" | "section" | "article";
}

const paddingClass: Record<SurfacePadding, string> = {
  none: "",
  sm: "px-3 py-2",
  md: "p-3",
  lg: "p-4",
};

/**
 * Single source of truth for the recurring "frosted glass" surface treatment.
 * Replaces ad-hoc `bg-white/60 backdrop-blur-md border border-white/40` recipes.
 */
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant = "glass", padding = "md", as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref as never}
        className={clsx(
          "rounded-lg border",
          variant === "glass" &&
            "bg-white/60 backdrop-blur-xl border-white/40 shadow-sm",
          variant === "elevated" &&
            "bg-card/95 backdrop-blur-md border-white/50 shadow-glass",
          paddingClass[padding],
          className,
        )}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";
