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
      className={clsx("space-y-2", className)}
      {...props}
    >
      {title && (
        <UIText.Heading>
          {title}
        </UIText.Heading>
      )}
      {description && (
        <UIText.BodyMutedS>
          {description}
        </UIText.BodyMutedS>
      )}
      {children}
    </div>
  );
};