import { type ImgHTMLAttributes } from "react";
import clsx from "clsx";

interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
}

export const CardImage = ({
  className,
  size = "md",
  alt = "",
  ...props
}: CardImageProps) => {
  const heightClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
  };

  return (
    <img
      alt={alt}
      className={clsx(
        "w-full object-cover",
        heightClasses[size],
        className
      )}
      {...props}
    />
  );
};