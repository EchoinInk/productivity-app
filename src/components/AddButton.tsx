import { ReactNode } from "react";
import clsx from "clsx";
import { gradientPrimaryCss } from "@/lib/gradients";

interface AddButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const AddButton = ({ children, onClick, className }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ background: gradientPrimaryCss }}
      className={clsx(
        "h-12 w-full rounded-lg",
        "inline-flex items-center justify-center gap-2",
        "text-white text-[15px] font-semibold tracking-tight",
        "shadow-[0_16px_40px_rgba(80,80,120,0.14)]",
        "active:scale-[0.97] transition-transform duration-150",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default AddButton;
