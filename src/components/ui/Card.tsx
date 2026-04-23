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
  const gradientTextShadow =
    "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]";

  const glassBase =
    "backdrop-blur-xl bg-white/80 border border-white/60";

  // ✅ SINGLE SOURCE OF TRUTH
  const cardShadow =
    "shadow-[0_10px_30px_rgba(120,110,200,0.17)]";

  const gradientStyle =
    variant === "primary"
      ? { background: gradientPrimaryCss }
      : variant === "budget"
      ? { background: gradientSecondaryCss }
      : variant === "adjunct"
      ? { background: gradientTertiaryCss }
      : variant === "recall"
      ? { background: gradientQuaternaryCss }
      : undefined;

  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",

        // DEFAULT
        variant === "default" && clsx(glassBase, cardShadow),

        // GRADIENT VARIANTS
        (variant === "primary" ||
          variant === "budget" ||
          variant === "adjunct" ||
          variant === "recall") &&
          clsx(gradientTextShadow, cardShadow),

        // ALERT
        variant === "alert" &&
          "bg-destructive text-destructive-foreground shadow-[0_6px_20px_rgba(255,0,0,0.2)]",

        className
      )}
      style={gradientStyle}
      {...props}
    />
  );
};