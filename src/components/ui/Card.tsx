import { type HTMLAttributes } from "react";
import clsx from "clsx";
import { brandGradients, gradients } from "@/theme";

/**
 * 🎯 Card Variants (UX-driven, not just visual)
 */
export type CardVariant =
  | "hero"     // Primary focus (top of screen)
  | "default"  // Standard content
  | "data"     // Metrics / insights
  | "alert"    // Urgent / attention
  | "subtle"   // Minimal / transparent
  | "budget";  // Budget-focused gradient (legacy)

/**
 * 📏 Size Variants (controls padding + radius)
 */
export type CardSize = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
}

/**
 * 🎨 Gradient Mapping (LIMITED USE = better hierarchy)
 */
const gradientVariants: Partial<Record<CardVariant, string>> = {
  hero: brandGradients.primary,
  data: brandGradients.secondary,
  budget: gradients.budget,
};

export const Card = ({
  className,
  variant = "default",
  size = "md",
  style,
  ...props
}: CardProps) => {
  /**
   * 🎨 Apply gradient ONLY to specific variants
   */
  const gradientStyle =
    gradientVariants[variant]
      ? {
          background: gradientVariants[variant],
          filter: "saturate(1.05) contrast(1.03)",
        }
      : undefined;

  return (
    <div
      className={clsx(
        "transition-all duration-200",

        /**
         * 🧩 VARIANTS
         */

        // ⚪ DEFAULT (glass style)
        variant === "default" &&
          "bg-white/80 backdrop-blur-xl border border-white/60 shadow-[var(--shadow-glass)]",

        // 🟣 HERO (dominant card)
        variant === "hero" &&
          "text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]",

        // 💙 BUDGET (legacy gradient surface)
        variant === "budget" &&
          "text-primary-foreground shadow-[var(--shadow-glass)]",

        // 💸 DATA (metrics / financial)
        variant === "data" &&
          "bg-white/90 backdrop-blur-lg border border-white/50 shadow-[var(--shadow-glass)]",

        // 🚨 ALERT (urgent but not aggressive)
        variant === "alert" &&
          "bg-white border border-red-200 text-red-600 shadow-[0_8px_20px_rgba(255,0,0,0.08)]",

        // 🔘 SUBTLE (no background)
        variant === "subtle" &&
          "bg-transparent",

        /**
         * 📏 SIZE SYSTEM
         */

        size === "sm" && "p-3 rounded-lg",
        size === "md" && "p-4 rounded-xl",
        size === "lg" && "p-6 rounded-2xl",

        /**
         * ✨ INTERACTIONS (optional but recommended)
         */
        "hover:shadow-md active:scale-[0.99]",

        className
      )}
      style={{
        ...gradientStyle,
        ...style,
      }}
      {...props}
    />
  );
};