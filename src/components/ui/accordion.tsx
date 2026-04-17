import { ReactNode } from "react";
import clsx from "clsx";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  className,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "h-12 px-4 rounded-xl text-sm font-semibold",
        "transition-all duration-200 active:scale-[0.96]",
        fullWidth && "w-full",

        // 🌈 PRIMARY (soft + depth)
        variant === "primary" &&
          "bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",

        // 🧊 SECONDARY (glass)
        variant === "secondary" &&
          "bg-white/60 backdrop-blur-xl border border-white/40 text-foreground shadow-[0_4px_15px_rgba(0,0,0,0.05)]",

        // 👻 GHOST
        variant === "ghost" &&
          "text-muted-foreground hover:bg-white/40",

        className
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
