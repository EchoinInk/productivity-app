import { type ReactNode } from "react";
import { Card } from "@/shared/ui/Card";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "budget" | "alert";
}

const AppCard = ({ children, className, gradient }: AppCardProps) => (
  <Card variant={gradient ?? "default"} className={className}>
    {children}
  </Card>
);

export default AppCard;
