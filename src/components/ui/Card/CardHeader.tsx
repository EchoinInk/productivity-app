import { type HTMLAttributes } from "react";
import clsx from "clsx";
import { Heading, BodyMuted } from "@/components/ui/Text";

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
          <Heading as="h3" className="text-base">
            {title}
          </Heading>
        )}

        {description && (
          <BodyMuted>
            {description}
          </BodyMuted>
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