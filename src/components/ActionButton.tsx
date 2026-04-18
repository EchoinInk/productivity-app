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
        "h-12 w-full rounded-lg",
        "inline-flex items-center justify-center gap-2",
        "text-white text-[15px] font-semibold tracking-tight",
        "shadow-[0_16px_40px_rgba(80,80,120,0.14)]",
        "transition-all duration-200 active:scale-[0.96]",
        fullWidth && "w-full",

        variant === "primary" &&
          "bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",

        variant === "secondary" && "bg-white/60 backdrop-blur-md border border-[#b8dfff]/60 text-foreground",

        variant === "ghost" && "text-muted-foreground hover:bg-white/40",

        className,
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
