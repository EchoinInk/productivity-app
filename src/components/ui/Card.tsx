import { type HTMLAttributes } from "react";
import clsx from "clsx";
import { brandGradients } from "@/theme";

type CardVariant = "default" | "primary" | "budget" | "alert" | "adjunct" | "recall";
type GradientCardVariant = Exclude<CardVariant, "default" | "alert">;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const gradientMap: Record<GradientCardVariant, string> = {
  primary: brandGradients.primary,
  budget: brandGradients.secondary,
  adjunct: brandGradients.tertiary,
  recall: brandGradients.quaternary,
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

  const cardShadow = "shadow-[var(--shadow-glass)]";

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
        "rounded-lg p-4 transition-all duration-200",

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
