import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({
  title = "Nothing here yet",
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>

      {description && (
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;