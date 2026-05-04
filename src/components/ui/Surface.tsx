import { forwardRef, type HTMLAttributes } from "react";
import clsx from "clsx";

type SurfaceVariant = "default" | "elevated" | "glass";
type SurfacePadding = "none" | "sm" | "md" | "lg";
type SurfaceRadius = "sm" | "md" | "lg" | "xl";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  padding?: SurfacePadding;
  radius?: SurfaceRadius;
  as?: "div" | "section" | "article" | "aside";
}

const variantClass: Record<SurfaceVariant, string> = {
  default: "bg-surface border border-border-default shadow-card",
  elevated: "bg-surface-elevated border border-border-default shadow-elevated",
  glass: "bg-surface-glass backdrop-blur-md border border-border-default/50 shadow-elevated",
};

const paddingClass: Record<SurfacePadding, string> = {
  none: "",
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
};

const radiusClass: Record<SurfaceRadius, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant = "default", padding = "md", radius = "lg", as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref as never}
        className={clsx(
          "border",
          variantClass[variant],
          paddingClass[padding],
          radiusClass[radius],
          className,
        )}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";
