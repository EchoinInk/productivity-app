import { type ReactNode } from "react";
import { Button } from "@/shared/ui/Button";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "adjunct" | "recall";
  fullWidth?: boolean;
  className?: string;
}

const ActionButton = ({ children, onClick, variant = "primary", fullWidth = false, className }: ActionButtonProps) => (
  <Button onClick={onClick} variant={variant} fullWidth={fullWidth} className={className}>
    {children}
  </Button>
);

export default ActionButton;
