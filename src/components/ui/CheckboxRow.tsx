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
      "flex items-center gap-3 py-3 px-1 border-b border-border/60 last:border-b-0 transition-colors duration-200",
      onClick && "cursor-pointer hover:bg-muted/30 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
          "w-11 h-11 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:scale-105 active:scale-95",
          checked ? "gradient-primary text-primary-foreground shadow-card" : "border border-muted-foreground/30 bg-background hover:border-primary/50",
        )}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </button>
    )}
    <div className="flex-1 min-w-0">{children}</div>
    {rightContent && <div className="shrink-0">{rightContent}</div>}
  </div>
);
