import clsx from "clsx";
import { type HTMLAttributes } from "react";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Tone = "default" | "muted" | "accent" | "danger" | "success" | "onColor";
type Align = "left" | "center" | "right";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  weight?: Weight;
  tone?: Tone;
  align?: Align;
  truncate?: boolean;
};

const weightMap: Record<Weight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const toneClass: Record<Tone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-[hsl(var(--accent-soft))]",
  danger: "text-destructive",
  success: "text-accent",
  onColor: "drop-shadow-[var(--text-shadow-onColor)]",
};

function TextBase({
  as = "p",
  className,
  weight = "regular",
  tone = "default",
  align = "left",
  truncate = false,
  ...props
}: TextProps) {
  const Component = as as "p";

  return (
    <Component
      className={clsx(
        weightMap[weight],
        toneClass[tone],
        {
          truncate,
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
      {...props}
    />
  );
}

export const UIText = {
  // HERO
  HeroTitle: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-lg", props.className)} weight="semibold" tone="onColor" />
  ),

  HeroSubtext: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[13px]", props.className)} tone="onColor" />
  ),

  HeroSupport: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[12px]", props.className)} tone="onColor" />
  ),

  // METRIC (Money)
  Metric: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-2xl", props.className)} weight="semibold" />
  ),

  MetricLabel: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-sm", props.className)} tone="muted" />
  ),

  // HEADINGS
  Heading: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-base", props.className)} weight="semibold" />
  ),

  // BODY
  Body: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[13px]", props.className)} />
  ),

  BodyMuted: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[11px]", props.className)} tone="muted" />
  ),


  BodyStrong: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[13px]", props.className)} weight="semibold" />
  ),

  // CTA
  CTA: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx("text-sm", props.className)}
      weight="semibold"
    />
  ),

  // LABEL
  Label: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-xs", props.className)} tone="muted" />
  ),

  // UNIVERSAL
  Meta: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-xs", props.className)} tone="muted" />
  ),
  LabelSoft: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-sm", props.className)} weight="medium" />
  ),
  Highlight: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-sm", props.className)} tone="accent" weight="semibold" />
  ),
};