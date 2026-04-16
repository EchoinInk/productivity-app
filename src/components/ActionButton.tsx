import { ReactNode } from "react";

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
  className = "",
}: ActionButtonProps) => {
  const styles = {
    primary: "gradient-primary text-primary-foreground shadow-sm",
    secondary: "bg-secondary text-secondary-foreground",
    ghost: "text-primary hover:bg-secondary",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${styles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
