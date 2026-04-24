import clsx from "clsx";
import { type HTMLAttributes } from "react";
import { semanticColors } from "@/theme";

type TextProps = HTMLAttributes<HTMLElement>;

const base = "leading-snug";

export const UIText = {
  Display: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-3xl font-bold", className)}
      style={{ color: semanticColors.softText, ...props.style }}
      {...props}
    />
  ),

  DisplaySoft: ({ className, ...props }: TextProps) => (
    <span
      className={clsx(
        "text-3xl font-bold text-white text-shadow-soft",
        className
      )}
      {...props}
    />
  ),

  Header: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-2xl font-bold text-foreground", className)}
      {...props}
    />
  ),

  Title: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-base font-semibold text-foreground tracking-wide", className)}
      {...props}
    />
  ),

  Section: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm font-semibold text-foreground", className)}
      {...props}
    />
  ),

  LabelSoft: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-sm font-medium", className)}
      style={{ color: semanticColors.softText, ...props.style }}
      {...props}
    />
  ),

  Body: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm text-foreground", className)}
      {...props}
    />
  ),

  Micro: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  ),

  Meta: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-[11px] text-muted-foreground", className)}
      {...props}
    />
  ),

  Highlight: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-[11px] font-medium", className)}
      style={{ color: semanticColors.accentText, ...props.style }}
      {...props}
    />
  ),

};
