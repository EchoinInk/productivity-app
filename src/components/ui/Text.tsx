import clsx from "clsx";
import { type HTMLAttributes } from "react";

type TextProps = HTMLAttributes<HTMLElement>;

const base = "leading-snug";

export const UIText = {
  // 1. DISPLAY (largest)
  Display: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-3xl font-bold text-[#5A626D]", className)}
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

  // 2. HEADER
  Header: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-2xl font-bold text-foreground", className)}
      {...props}
    />
  ),

  // 3. TITLE
  Title: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-base font-semibold text-foreground tracking-wide", className)}
      {...props}
    />
  ),

  // 4. SECTION
  Section: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm font-semibold text-foreground", className)}
      {...props}
    />
  ),

  // 4.5 LABEL SOFT (same size tier as Section, but soft + glowing)
  LabelSoft: ({ className, ...props }: TextProps) => (
    <span
      className={clsx(
        "text-sm font-medium text-[#5A626D]",
        className
      )}
      {...props}
    />
  ),

  // 5. BODY
  Body: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-sm text-foreground", className)}
      {...props}
    />
  ),

  // 6. MICRO
  Micro: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  ),

  // 7. META
  Meta: ({ className, ...props }: TextProps) => (
    <p
      className={clsx(base, "text-[11px] text-muted-foreground", className)}
      {...props}
    />
  ),

  // 8. HIGHLIGHT
  Highlight: ({ className, ...props }: TextProps) => (
    <span
      className={clsx("text-[11px] font-medium text-[#7C8BC4]", className)}
      {...props}
    />
  ),

};