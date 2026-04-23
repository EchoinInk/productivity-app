import { type HTMLAttributes } from "react";
import clsx from "clsx";

import {
  gradientPrimaryCss,
  gradientSecondaryCss,
  gradientTertiaryCss,
  gradientQuaternaryCss,
} from "@/lib/gradients";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "budget" | "alert" | "adjunct" | "recall";
}

export const Card = ({
  className,
  variant = "default",
  ...props
}: CardProps) => {
  const glassBase =
    "backdrop-blur-xl bg-white/80 border border-white/60";

  const cardShadow =
    "shadow-[0_10px_30px_rgba(120,110,200,0.17)]";

  const isGradient =
    variant === "primary" ||
    variant === "budget" ||
    variant === "adjunct" ||
    variant === "recall";

  const gradientMap = {
    primary: gradientPrimaryCss,
    budget: gradientSecondaryCss,
    adjunct: gradientTertiaryCss,
    recall: gradientQuaternaryCss,
  };

  const gradientStyle = isGradient
    ? {
        background: gradientMap[variant as keyof typeof gradientMap],
        filter: "saturate(1.1) contrast(1.05)",
      }
    : undefined;

  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",

        // DEFAULT (glass)
        variant === "default" && clsx(glassBase, cardShadow),

        // GRADIENT VARIANTS
        isGradient &&
          clsx(
            "text-white",
            "text-shadow-soft",            // shadow on the card
            "[&_*]:text-shadow-soft",      // shadow on all children
            cardShadow
          ),

        // ALERT VARIANT
        variant === "alert" &&
          "bg-destructive text-destructive-foreground shadow-[0_6px_20px_rgba(255,0,0,0.2)]",

        className
      )}
      style={gradientStyle}
      {...props}
    />
  );
};
