import clsx from "clsx";
import { categoryStyles } from "@/lib/categoryStyles";

interface ListItemProps {
  label: string;
  subtitle?: string;
  meta?: string;
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  rightContent?: React.ReactNode;
  category?: string;
}

const ListItem = ({ label, subtitle, meta, checked, onToggle, onClick, rightContent, category }: ListItemProps) => {
  const style = categoryStyles[category as keyof typeof categoryStyles] || categoryStyles.Other;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-3 px-1 border-b border-white/40 last:border-b-0 cursor-pointer"
    >
      {/* ✅ CHECKBOX */}
      {onToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={clsx(
            "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all",
            checked
              ? "bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow-sm"
              : "border border-muted-foreground/30",
          )}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}

      {/* ✅ TEXT */}
      <div className="flex-1 min-w-0">
        {/* TASK NAME (CATEGORY COLORED) */}
        <p
          className={clsx("text-sm font-semibold transition-all", checked && "line-through opacity-50")}
          style={{ color: style.text }}
        >
          {label}
        </p>

        {/* SUB CONTENT */}
        <div className="mt-1 flex flex-col gap-1">
          {/* NOTES */}
          {subtitle && <p className="text-xs text-muted-foreground leading-tight">{subtitle}</p>}

          {/* CATEGORY PILL */}
          {category && (
            <span
              className="inline-block w-fit text-[11px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: style.bg,
                color: style.text,
              }}
            >
              {category}
            </span>
          )}

          {/* DATE / TIME */}
          {meta && <p className="text-xs text-muted-foreground leading-tight">{meta}</p>}
        </div>
      </div>

      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
};

export default ListItem;
