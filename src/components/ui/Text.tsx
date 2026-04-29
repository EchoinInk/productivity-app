import clsx from "clsx";
import { type HTMLAttributes } from "react";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Tone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "onColor";
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
  accent: "text-accent",
  danger: "text-destructive",
  success: "text-success",
  onColor: "text-white drop-shadow-[var(--text-shadow-onColor)]",
};

const size = {
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

function TextBase({
  as = "p",
  className,
  weight = "regular",
  tone = "default",
  align = "left",
  truncate = false,
  ...props
}: TextProps) {
  const Component = as as keyof JSX.IntrinsicElements;

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
      {...(props as any)}
    />
  );
}

export const UIText = {
  // HERO
  HeroTitle: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.heroTitle, props.className)}
      weight="semibold"
      tone="onColor"
    />
  ),

  HeroSubtext: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.heroSub, props.className)}
      tone="onColor"
    />
  ),

  HeroSupport: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.heroSupport, props.className)}
      tone="onColor"
    />
  ),

  // METRIC (Money)
  Metric: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.metric, props.className)}
      weight="semibold"
    />
  ),

  MetricLabel: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.metricLabel, props.className)}
      tone="muted"
    />
  ),

  // HEADINGS
  Heading: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.heading, props.className)}
      weight="semibold"
    />
  ),

  // BODY
  Body: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.body, props.className)}
    />
  ),

  BodyMuted: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.bodyMuted, props.className)}
      tone="muted"
    />
  ),

  BodyStrong: (props: TextProps) => (
    <TextBase
      {...props}
      className={clsx(size.bodyStrong, props.className)}
      weight="semibold"
    />
  ),

  // CTA
  CTA: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.cta, props.className)}
      weight="semibold"
    />
  ),

  // LABEL
  Label: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.label, props.className)}
      tone="muted"
    />
  ),

  // UNIVERSAL
  Text: TextBase,

  Meta: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.meta, props.className)}
      tone="muted"
    />
  ),

  LabelSoft: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.labelSoft, props.className)}
      weight="medium"
    />
  ),

  Highlight: (props: TextProps) => (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.highlight, props.className)}
      tone="accent"
      weight="semibold"
    />
  ),
};
