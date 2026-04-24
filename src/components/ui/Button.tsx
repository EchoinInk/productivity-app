import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { brandGradients } from "@/theme";

type ButtonVariant = "primary" | "secondary" | "adjunct" | "budget" | "recall";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, { background: string; class: string }> = {
  primary: {
    background: brandGradients.primary,
    class: "text-white drop-shadow-[0_1px_var(--space-2)_rgba(0,0,0,0.22)]",
  },
  secondary: {
    background: "rgba(255,255,255,0.80)",
    class: "text-foreground border border-white/60 backdrop-blur-xl shadow-sm",
  },
  budget: {
    background: brandGradients.secondary,
    class: "text-white drop-shadow-[0_1px_var(--space-2)_rgba(0,0,0,0.22)]",
  },
  adjunct: {
    background: brandGradients.tertiary,
    class: "text-white drop-shadow-[0_1px_var(--space-2)_rgba(0,0,0,0.22)]",
  },
  recall: {
    background: brandGradients.quaternary,
    class: "text-white drop-shadow-[0_1px_var(--space-2)_rgba(0,0,0,0.22)]",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, type = "button", ...props }, ref) => {
    const styles = variantStyles[variant];

    return (
      <button
        ref={ref}
        type={type}
        style={{ background: styles.background }}
        className={clsx(
          "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          styles.class,
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
