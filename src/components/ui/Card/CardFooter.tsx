import { type HTMLAttributes } from "react";
import clsx from "clsx";

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export const CardFooter = ({
  className,
  size = "md",
  ...props
}: CardFooterProps) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-2 border-t border-white/20",
        paddingClasses[size],
        className
      )}
      {...props}
    />
  );
};