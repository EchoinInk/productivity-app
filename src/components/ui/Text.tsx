import clsx from "clsx";
import { type HTMLAttributes } from "react";

type TextProps = HTMLAttributes<HTMLElement>;

const base = "leading-snug";

export const UIText = {
  Title: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-2xl font-semibold text-foreground", className)}
      {...props}
    />
  ),

  Section: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm font-semibold text-foreground", className)}
      {...props}
    />
  ),

  Body: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm text-foreground", className)}
      {...props}
    />
  ),

  Meta: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-xs text-muted-foreground", className)}
      {...props}
    />
  ),

  Highlight: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-xs font-medium text-primary", className)}
      {...props}
    />
  ),

  // 🔥 NEW — DISPLAY (NO SHADOW)
  Display: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-3xl font-bold text-white", className)}
      {...props}
    />
  ),

  // 🔥 NEW — DISPLAY WITH SHADOW
  DisplaySoft: ({ className, ...props }: TextProps) => (
    <span
      className={clsx(
        "text-3xl font-bold text-white text-shadow-soft",
        className
      )}
      {...props}
    />
  ),

  // 🔥 NEW — SMALL EMPHASIS WITH SHADOW
  LabelSoft: ({ className, ...props }: TextProps) => (
    <span
      className={clsx(
        "text-sm font-medium text-white text-shadow-soft",
        className
      )}
      {...props}
    />
  ),
};