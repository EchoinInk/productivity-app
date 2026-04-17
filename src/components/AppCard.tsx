import { ReactNode } from "react";
import clsx from "clsx";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget" | "alert";
}

const gradientStyles = {
  primary: "bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",

  budget: "bg-gradient-to-r from-green-300 via-blue-300 to-blue-300 text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)]",

  alert: "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
};

const AppCard = ({ children, className, gradient }: AppCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",
        gradient
          ? gradientStyles[gradient]
          : "bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AppCard;
