import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "aria-label": string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={clsx(
      "inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));

IconButton.displayName = "IconButton";
