import { type HTMLAttributes } from "react";

export type Weight = "regular" | "medium" | "semibold" | "bold";
export type Tone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "onColor";
export type Align = "left" | "center" | "right";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  weight?: Weight;
  tone?: Tone;
  align?: Align;
  truncate?: boolean;
};

export const weightMap: Record<Weight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const toneClass: Record<Tone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent",
  danger: "text-destructive",
  success: "text-success",
  onColor: "text-white drop-shadow-[var(--text-shadow-onColor)]",
};

export const size = {
  heroTitle: "text-lg",
  heroSub: "text-[13px]",
  heroSupport: "text-[12px]",
  metric: "text-2xl",
  metricLabel: "text-sm",
  heading: "text-base",
  body: "text-[13px]",
  bodyMuted: "text-[11px]",
  bodyStrong: "text-[13px]",
  cta: "text-sm",
  label: "text-xs",
  meta: "text-xs",
  labelSoft: "text-sm",
  highlight: "text-sm",
};
