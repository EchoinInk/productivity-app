import { ReactNode } from "react";
import clsx from "clsx";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget" | "alert";
}

const gradientStyles = {
  primary:
    "bg-gradient-to-r from-blue-400/90 to-purple-400/90 text-white shadow-md",
  budget:
    "bg-gradient-to-r from-green-400/90 to-blue-400/90 text-white shadow-md",
  alert:
    "bg-gradient-to-r from-red-400/90 to-pink-400/90 text-white shadow-md",
};

const AppCard = ({ children, className, gradient }: AppCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",
        gradient
          ? gradientStyles[gradient]
          : "bg-white/70 backdrop-blur-md border border-white/40 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AppCard;
