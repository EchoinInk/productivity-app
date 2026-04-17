import clsx from "clsx";

interface ListItemProps {
  label: string;
  subtitle?: string;
  checked?: boolean;
  onToggle?: () => void;
  rightContent?: React.ReactNode;
  category?: string;
}

const ListItem = ({ label, subtitle, checked, onToggle, rightContent, category }: ListItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 px-1 border-b border-white/40 last:border-b-0">
      
      {/* Checkbox */}
      {onToggle && (
        <button
          onClick={onToggle}
          className={clsx(
            "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all",
            checked
              ? "bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow-sm"
              : "border border-muted-foreground/30"
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

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            "text-sm font-medium transition-all",
            checked && "line-through text-muted-foreground",
            !checked && "text-foreground"
          )}
        >
          {label}
        </p>

        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
};

export default ListItem;
