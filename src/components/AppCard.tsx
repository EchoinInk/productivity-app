import { ReactNode } from "react";
import clsx from "clsx";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget" | "alert";
}

const gradientStyles = {
  primary: "bg-gradient-to-r from-[#6FA8FF] to-[#C084FC] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",

  budget: "bg-gradient-to-r from-[#6EE7B7] via-[#67E8F9] to-[#93C5FD]",

  alert: "bg-gradient-to-r from-[#F9A8D4] to-[#C084FC] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
};

const AppCard = ({ children, className, gradient }: AppCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 transition-all duration-200",
        gradient
          ? gradientStyles[gradient]
          : "bg-white/80 backdrop-blur-md border border-white/40 shadow-[0_16px_40px_rgba(80,80,120,0.14)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AppCard;
