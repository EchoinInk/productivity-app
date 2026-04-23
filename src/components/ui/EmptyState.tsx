import { type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";
import { UIText } from "@/components/ui/Text";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({
  title = "Nothing here yet",
  description,
  action,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center py-8 px-4 space-y-1",
        className
      )}
      {...props}
    >
      <UIText.Body className="font-semibold">
        {title}
      </UIText.Body>

      {description && (
        <UIText.Meta>
          {description}
        </UIText.Meta>
      )}

      {action && <div className="pt-3">{action}</div>}
    </div>
  );
};

export default EmptyState;