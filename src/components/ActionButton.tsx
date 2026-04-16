import { ReactNode } from "react";
import clsx from "clsx";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  className?: string;
}

const ActionButton = ({ children, onClick, variant = "primary", fullWidth = false, className }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "h-12 px-4 rounded-xl text-sm font-semibold",
        "transition-all duration-150 active:scale-[0.97]",
        fullWidth && "w-full",

        // Variants
        variant === "primary" && "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-sm",

        variant === "secondary" && "bg-white border border-border text-foreground",

        variant === "ghost" && "text-primary hover:bg-secondary",

        className,
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
