import { type HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "primary" | "budget" | "alert";
}

export const Card = ({ className, variant = "default", ...props }: CardProps) => (
  <div
    className={clsx(
      "rounded-md p-4 transition-all duration-200",
      variant === "default" && "bg-card/80 backdrop-blur-md border border-border shadow-card",
      variant === "elevated" && "bg-card shadow-elevated",
      variant === "primary" && "gradient-primary text-primary-foreground shadow-elevated",
      variant === "budget" && "gradient-budget text-primary-foreground shadow-elevated",
      variant === "alert" && "bg-destructive text-destructive-foreground shadow-elevated",
      className,
    )}
    {...props}
  />
);
