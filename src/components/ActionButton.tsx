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

        // 🌈 PRIMARY (gradient, premium)
        variant === "primary" &&
          "bg-gradient-to-r from-blue-400/90 to-purple-400/90 text-white shadow-md",

        // 🧊 SECONDARY (glass style)
        variant === "secondary" &&
          "bg-white/70 backdrop-blur-md border border-white/40 text-foreground shadow-sm",

        // 👻 GHOST (subtle interaction)
        variant === "ghost" &&
          "text-primary hover:bg-white/40 active:bg-white/60 rounded-lg",

        className
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
