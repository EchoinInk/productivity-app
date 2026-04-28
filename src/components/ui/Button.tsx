import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "adjunct" | "budget" | "recall";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-hero text-white drop-shadow-[0_1px_var(--space-2)_hsl(220_20%_10%/0.22)]",
  secondary:
    "bg-white/80 text-foreground border border-white/60 backdrop-blur-xl shadow-sm",
  budget:
    "bg-gradient-data text-white drop-shadow-[0_1px_var(--space-2)_hsl(220_20%_10%/0.22)]",
  adjunct:
    "bg-gradient-accent text-white drop-shadow-[0_1px_var(--space-2)_hsl(220_20%_10%/0.22)]",
  recall:
    "bg-gradient-budget text-white drop-shadow-[0_1px_var(--space-2)_hsl(220_20%_10%/0.22)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantClass[variant],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
