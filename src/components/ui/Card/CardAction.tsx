import { type HTMLAttributes } from "react";
import clsx from "clsx";

interface CardActionProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
}

export const CardAction = ({
  className,
  align = "left",
  ...props
}: CardActionProps) => {
  const alignClasses = {
    left: "flex justify-start",
    center: "flex justify-center",
    right: "flex justify-end",
  };

  return (
    <div
      className={clsx(
        "mt-2",
        alignClasses[align],
        className
      )}
      {...props}
    />
  );
};