import clsx from "clsx";
import { type HTMLAttributes } from "react";

type TextProps = HTMLAttributes<HTMLParagraphElement>;

const base = "leading-snug";

export const UIText = {
  Title: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(
        base,
        "text-base font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),

  Section: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(
        base,
        "text-sm font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),

  Body: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(
        base,
        "text-sm text-foreground",
        className
      )}
      {...props}
    />
  ),
Highlight: ({ className, ...props }: TextProps) => (
  <span
    className={clsx(
      "text-xs font-medium text-primary",
      className
    )}
    {...props}
  />
),
  Meta: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(
        base,
        "text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
};