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
    "bg-white/70 backdrop-blur-md border border-border/40 shadow-soft",

  hero:
    "bg-gradient-hero text-primary-foreground shadow-pop",

  data:
    "bg-white/60 backdrop-blur-md border border-border/40 shadow-soft",

  budget:
    "bg-gradient-budget text-primary-foreground shadow-elevated",

  alert:
    "bg-card border border-destructive/30 text-destructive shadow-soft",

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
        "transition-transform duration-150 ease-out active:scale-[0.98]",
        "hover:shadow-pop",
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