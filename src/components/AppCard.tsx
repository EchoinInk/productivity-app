import { ReactNode } from "react";
import clsx from "clsx";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget" | "alert";
}

const gradientStyles = {
  primary: "bg-gradient-to-r from-blue-400 to-purple-400 text-white",
  budget: "bg-gradient-to-r from-green-400 to-blue-400 text-white",
  alert: "bg-gradient-to-r from-red-400 to-pink-400 text-white",
};

const AppCard = ({ children, className, gradient }: AppCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 shadow-sm",
        gradient ? gradientStyles[gradient] : "bg-white text-foreground border border-border",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AppCard;
