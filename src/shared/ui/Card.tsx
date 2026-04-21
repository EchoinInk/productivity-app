import { type HTMLAttributes } from "react";
import clsx from "clsx";

import {
  gradientPrimaryCss,
  gradientSecondaryCss,
  gradientTertiaryCss,
  gradientQuaternaryCss,
} from "@/styles/gradients";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "elevated"
    | "primary"
    | "budget"
    | "alert"
    | "adjunct"
    | "recall";
}

export const Card = ({ className, variant = "default", ...props }: CardProps) => {
  // Shared white text shadow for gradient variants
  const gradientTextShadow = "drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)] text-white";

  // Shared glass blur layer
  const glassBase =
    "backdrop-blur-xl bg-white/80 border border-white/60";

  // Soft card shadow
  const softShadow = "shadow-[0_3px_12px_rgba(120,110,200,0.42)]";

  // Elevated shadow
  const elevatedShadow = "shadow-[0_8px_30px_rgba(180,150,200,0.10)]";

  // Determine gradient background
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
        "rounded-lg p-4 transition-all duration-200",

        // DEFAULT → CardSoft + glass
        variant === "default" && clsx(glassBase, softShadow),

        // ELEVATED → glass + elevated shadow
        variant === "elevated" && clsx(glassBase, elevatedShadow),

        // PRIMARY → gradient + white text shadow
        variant === "primary" && clsx(gradientTextShadow, elevatedShadow),

        // BUDGET → gradient + white text shadow
        variant === "budget" && clsx(gradientTextShadow, elevatedShadow),

        // ADJUNCT → gradient + white text shadow
        variant === "adjunct" && clsx(gradientTextShadow, elevatedShadow),

        // RECALL → gradient + white text shadow
        variant === "recall" && clsx(gradientTextShadow, elevatedShadow),

        // ALERT → destructive
        variant === "alert" &&
          "bg-destructive text-destructive-foreground shadow-[0_4px_14px_rgba(255,0,0,0.25)]",

        className,
      )}
      style={gradientStyle}
      {...props}
    />
  );
};
