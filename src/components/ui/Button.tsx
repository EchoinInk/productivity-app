import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-primary text-text-on-primary shadow-button hover:shadow-elevated hover:brightness-105 active:scale-[0.98] transition-all duration-200",
  secondary:
    "bg-surface border border-border-default text-text-primary hover:bg-surface-elevated hover:border-secondary active:scale-[0.98] transition-all duration-200",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-elevated hover:text-text-primary active:scale-[0.98] transition-all duration-200",
  danger:
    "bg-error text-text-on-primary shadow-button hover:shadow-elevated hover:brightness-105 active:scale-[0.98] transition-all duration-200",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50",
          variantClass[variant],
          sizeClass[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
