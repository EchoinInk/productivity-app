import { type HTMLAttributes } from "react";
import clsx from "clsx";
import type { CardVariant, CardSize } from "./types";

import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
}

const variantClass: Record<CardVariant, string> = {
  default:
    "bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_6px_20px_rgba(0,0,0,0.06)]",

  hero:
    "bg-gradient-hero text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",

  data:
    "bg-white/60 backdrop-blur-md border border-white/40 shadow-[0_6px_20px_rgba(0,0,0,0.06)]",

  budget:
    "bg-gradient-budget text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.08)]",

  alert:
    "bg-card border border-destructive/30 text-destructive shadow-[0_6px_18px_rgba(0,0,0,0.08)]",

  subtle:
    "bg-transparent",
};

const sizeClass: Record<CardSize, string> = {
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-2xl",
};

const CardBase = ({
  className,
  variant = "default",
  size = "md",
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(
        // 🔥 refined interaction (feels native)
        "transition-transform duration-150 ease-out active:scale-[0.98]",

        // optional hover only on non-touch devices
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]",

        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
};

type CardComponent = typeof CardBase & {
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
};

export const Card = Object.assign(CardBase, {
  Body: CardBody,
  Header: CardHeader,
  Footer: CardFooter,
}) as CardComponent;