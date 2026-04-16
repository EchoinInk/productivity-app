import { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget";
}

const AppCard = ({ children, className = "", gradient }: AppCardProps) => {
  const base = gradient
    ? `gradient-${gradient} rounded-xl p-4 text-primary-foreground`
    : "card-base";

  return <div className={`${base} ${className}`}>{children}</div>;
};

export default AppCard;
