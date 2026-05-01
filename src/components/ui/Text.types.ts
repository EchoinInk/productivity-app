export type Weight = "regular" | "medium" | "semibold" | "bold";
export type Tone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "onColor";
export type Align = "left" | "center" | "right";

type TextOwnProps = {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: Weight;
  tone?: Tone;
  align?: Align;
  truncate?: boolean;
};

export type TextProps = TextOwnProps & React.HTMLAttributes<HTMLElement>;

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
