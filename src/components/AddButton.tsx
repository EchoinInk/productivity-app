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
        "h-10 w-full rounded-lg",
        "inline-flex items-center justify-center gap-2",
        "text-white text-[12px] font-semibold tracking-tight",
        "shadow-[0_10px_24px_rgba(150,140,220,0.25)]",
        "active:scale-[0.97] transition-transform duration-150",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default AddButton;
