import { type HTMLAttributes } from "react";
import clsx from "clsx";
import { UIText } from "@/components/ui/Text";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const CardHeader = ({
  className,
  title,
  description,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div
  className={clsx(
    "flex items-start justify-between gap-4 px-4 pt-4",
    className
  )}
      {...props}
    >
      {/* LEFT */}
      <div className="min-w-0">
        {title && (
          <UIText.Heading as="h3">
            {title}
          </UIText.Heading>
        )}

        {description && (
          <UIText.BodyMutedS>
            {description}
          </UIText.BodyMutedS>
        )}
      </div>

      {/* RIGHT */}
      {children && (
        <div className="shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};