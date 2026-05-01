import { type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";
import { Body, Meta } from "@/components/ui/Text";

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
      <Body className="font-semibold text-lg">
        {title}
      </Body>

      {description && (
        <Meta className="text-sm text-gray-500">
          {description}
        </Meta>
      )}

      {action && (
        <div className="pt-4">
          <div className="border rounded-md p-4 bg-gray-100">
            {action}
          </div>
        </div>
      )}
    </div>
  );
};

export { EmptyState };