import { type HTMLAttributes } from "react";
import clsx from "clsx";

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  layout?: "stack" | "row" | "between";
}

export const CardBody = ({
  className,
  size = "md",
  layout = "stack",
  ...props
}: CardBodyProps) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const layoutClasses = {
    stack: "flex flex-col space-y-4",
    row: "flex items-center gap-4",
    between: "flex items-center justify-between gap-4",
  };

  return (
    <div
      className={clsx(
        paddingClasses[size],
        layoutClasses[layout],
        className
      )}
      {...props}
    />
  );
};