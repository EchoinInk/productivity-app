import { type HTMLAttributes } from "react";
import clsx from "clsx";
import { brandGradients, gradients } from "@/theme";
import type { CardVariant, CardSize } from "./types";

import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";

/**
 * -----------------------------
 * TYPES
 * -----------------------------
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
}

/**
 * -----------------------------
 * GRADIENT MAPPING
 * (limited usage = better hierarchy)
 * -----------------------------
 */

const gradientVariants: Partial<Record<CardVariant, string>> = {
  hero: brandGradients.primary,
  data: brandGradients.secondary,
  budget: gradients.budget,
};

/**
 * -----------------------------
 * BASE CARD COMPONENT
 * -----------------------------
 */

const CardBase = ({
  className,
  variant = "default",
  size = "md",
  style,
  ...props
}: CardProps) => {
  const gradientStyle =
    gradientVariants[variant]
      ? {
          background: gradientVariants[variant],
          filter: "saturate(1.1) contrast(1.05)", // slightly stronger for better UI
        }
      : undefined;

  return (
    <div
      className={clsx(
        "transition-all duration-200",

        /**
         * 🧩 VARIANTS
         */

        // ⚪ DEFAULT (glass)
        variant === "default" &&
          "bg-white/80 backdrop-blur-xl border border-white/60 shadow-[var(--shadow-glass)]",

        // 🟣 HERO
        variant === "hero" &&
          "text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]",

        // 💸 DATA
        variant === "data" &&
          "bg-white/90 backdrop-blur-lg border border-white/50 shadow-[var(--shadow-glass)]",

        // 💙 BUDGET (legacy)
        variant === "budget" &&
          "text-primary-foreground shadow-[var(--shadow-glass)]",

        // 🚨 ALERT
        variant === "alert" &&
          "bg-white border border-red-200 text-red-600 shadow-[0_8px_20px_rgba(255,0,0,0.08)]",

        // 🔘 SUBTLE
        variant === "subtle" && "bg-transparent",

        /**
         * 📏 SIZE SYSTEM
         */

        size === "sm" && "rounded-lg",
        size === "md" && "rounded-xl",
        size === "lg" && "rounded-2xl",

        /**
         * ✨ INTERACTIONS
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

/**
 * -----------------------------
 * COMPOUND COMPONENT TYPES
 * -----------------------------
 */

type CardComponent = typeof CardBase & {
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
};

/**
 * -----------------------------
 * COMPOUND EXPORT
 * -----------------------------
 */

export const Card = Object.assign(CardBase, {
  Body: CardBody,
  Header: CardHeader,
  Footer: CardFooter,
}) as CardComponent;