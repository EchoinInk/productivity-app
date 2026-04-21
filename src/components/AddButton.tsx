import { type ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/shared/ui/Button";

interface AddButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "adjunct" | "recall";
}

const AddButton = ({ children, onClick, className, variant = "primary" }: AddButtonProps) => (
  <Button onClick={onClick} variant={variant} fullWidth className={clsx("h-12", className)}>
    {children}
  </Button>
);

export default AddButton;
