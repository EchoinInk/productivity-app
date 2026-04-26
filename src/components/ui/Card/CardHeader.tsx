import { type HTMLAttributes } from "react";
import clsx from "clsx";

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
      className={clsx("space-y-2", className)}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};