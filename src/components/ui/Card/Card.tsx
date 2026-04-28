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
    "bg-white/80 backdrop-blur-xl border border-white/60 shadow-glass",
  hero:
    "bg-gradient-hero text-white shadow-[0_20px_40px_hsl(220_20%_10%/0.15)] saturate-[1.1] contrast-[1.05]",
  data:
    "bg-gradient-data text-foreground backdrop-blur-lg border border-white/50 shadow-glass saturate-[1.1] contrast-[1.05]",
  budget:
    "bg-gradient-budget text-primary-foreground shadow-glass",
  alert:
    "bg-card border border-destructive/30 text-destructive shadow-card",
  subtle: "bg-transparent",
};

const sizeClass: Record<CardSize, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
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
        "transition-all duration-200 hover:shadow-md active:scale-[0.99]",
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
