import { type HTMLAttributes } from "react";
import clsx from "clsx";

import {
  gradientPrimaryCss,
  gradientSecondaryCss,
  gradientTertiaryCss,
  gradientQuaternaryCss,
} from "@/lib/gradients";

type CardVariant = "default" | "primary" | "budget" | "alert" | "adjunct" | "recall";
type GradientCardVariant = Exclude<CardVariant, "default" | "alert">;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const gradientMap: Record<GradientCardVariant, string> = {
  primary: gradientPrimaryCss,
  budget: gradientSecondaryCss,
  adjunct: gradientTertiaryCss,
  recall: gradientQuaternaryCss,
};

const isGradientVariant = (variant: CardVariant): variant is GradientCardVariant =>
  variant in gradientMap;

export const Card = ({
  className,
  variant = "default",
  ...props
}: CardProps) => {
  const glassBase =
    "backdrop-blur-xl bg-white/80 border border-white/60";

  const cardShadow =
    "shadow-[0_3px_14px_rgba(120,150,255,0.22)]";

  const isGradient = isGradientVariant(variant);

  const gradientStyle = isGradient
    ? {
        background: gradientMap[variant],
        filter: "saturate(1.1) contrast(1.05)",
      }
    : undefined;

  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",

        variant === "default" && clsx(glassBase, cardShadow),

        isGradient &&
          clsx(
            "text-white",
            "text-shadow-soft",
            "[&_*]:text-shadow-soft",
            cardShadow
          ),

        variant === "alert" &&
          "bg-destructive text-destructive-foreground shadow-[0_var(--space-3)_20px_rgba(255,0,0,0.2)]",

        className
      )}
      style={gradientStyle}
      {...props}
    />
  );
};
