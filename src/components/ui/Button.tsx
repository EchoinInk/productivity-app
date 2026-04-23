import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { gradientPrimaryCss, gradientSecondaryCss, gradientTertiaryCss, gradientQuaternaryCss } from "@/lib/gradients";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "adjunct" | "recall";
  fullWidth?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, type = "button", ...props }, ref) => {
    

    const variantStyles = {
      primary: {
        background: gradientPrimaryCss,
        class: "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]",
      },
      secondary: {
        background: "rgba(255,255,255,0.80)",
        class: "text-foreground border border-white/60 backdrop-blur-xl shadow-sm",
      },
      adjunct: {
        background: gradientTertiaryCss,
        class: "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]",
      },
      recall: {
        background: gradientQuaternaryCss,
        class: "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]",
      },
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        style={{ background: variantStyles.background }}
        className={clsx(
          "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantStyles.class,
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
