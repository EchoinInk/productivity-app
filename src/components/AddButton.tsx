import { type ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/shared/ui/Button";

interface AddButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
}

const AddButton = ({ children, onClick, className }: AddButtonProps) => (
  <Button onClick={onClick} fullWidth className={clsx("h-12", className)}>
    {children}
  </Button>
);

export default AddButton;
