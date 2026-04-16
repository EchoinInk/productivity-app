interface ListItemProps {
  label: string;
  subtitle?: string;
  checked?: boolean;
  onToggle?: () => void;
  rightContent?: React.ReactNode;
}

const ListItem = ({ label, subtitle, checked, onToggle, rightContent }: ListItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-b-0">
      {onToggle !== undefined && (
        <button
          onClick={onToggle}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            checked
              ? "bg-primary border-primary"
              : "border-muted-foreground/40"
          }`}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
            </svg>
          )}
        </button>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {label}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
};

export default ListItem;
