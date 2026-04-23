import clsx from "clsx";
import { Check } from "lucide-react";
import { type ReactNode } from "react";

interface CheckboxRowProps {
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  children: ReactNode;
  rightContent?: ReactNode;
  className?: string;
}

export const CheckboxRow = ({ checked, onToggle, onClick, children, rightContent, className }: CheckboxRowProps) => (
  <div
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={(event) => {
      if (!onClick) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    }}
    className={clsx(
      "flex items-center gap-3 py-3 px-1 border-b border-border/60 last:border-b-0",
      onClick && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
  >
    {onToggle && (
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={checked ? "Mark incomplete" : "Mark complete"}
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        className={clsx(
          "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          checked ? "gradient-primary text-primary-foreground shadow-card" : "border border-muted-foreground/30 bg-background",
        )}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </button>
    )}
    <div className="flex-1 min-w-0">{children}</div>
    {rightContent && <div className="shrink-0">{rightContent}</div>}
  </div>
);
