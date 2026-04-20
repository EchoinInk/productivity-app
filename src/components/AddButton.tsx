import { ReactNode } from "react";
import clsx from "clsx";
import { gradientPrimaryCss, gradientSecondaryCss, gradientTertiaryCss } from "@/lib/gradients";

interface AddButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

const AddButton = ({ children, onClick, className, variant = "secondary" }: AddButtonProps) => {
  const backgrounds = {
    primary: gradientPrimaryCss,
    secondary: gradientSecondaryCss,
    tertiary: gradientTertiaryCss,
  };

  return (
    <button
      onClick={onClick}
      style={{ background: backgrounds[variant] }}
      className={clsx(
        "h-12 w-full rounded-lg",
        "inline-flex items-center justify-center gap-2",
        "text-white text-[15px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] font-semibold tracking-tight",
        "shadow-[0_3px_12px_rgba(120,110,200,0.42)]",
        "active:scale-[0.97] transition-transform duration-150",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default AddButton;
