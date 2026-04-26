import clsx from "clsx";
import { type HTMLAttributes } from "react";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Tone = "default" | "muted" | "accent" | "danger" | "success";
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
  accent: "text-[#7C8BC4]",
  danger: "text-destructive",
  success: "text-accent",
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
    <TextBase {...props} className={clsx("text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]",
      props.className)} weight="semibold" />
  ),

  HeroSubtext: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[13px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)", props.className)} />
  ),

  HeroSupport: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[12px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.22)", props.className)} />
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
    <TextBase {...props} className={clsx("text-sm", props.className)} tone="muted" />
  ),

  BodyMutedS: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-[11px]", props.className)} tone="muted" />
  ),

  BodyStrong: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-sm", props.className)} weight="semibold" />
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
  Text: TextBase,

  // ----- LEGACY ALIASES -----
  // Kept so the existing codebase keeps compiling. New code should use the
  // semantic variants above (HeroTitle, Metric, Heading, Body, ...).
  HeadingXL: (props: TextProps) => (
    <TextBase {...props} as="h1" className={clsx("text-2xl", props.className)} weight="bold" />
  ),
  HeadingL: (props: TextProps) => (
    <TextBase {...props} as="h2" className={clsx("text-lg", props.className)} weight="semibold" />
  ),
  HeadingM: (props: TextProps) => (
    <TextBase {...props} as="h3" className={clsx("text-base", props.className)} weight="semibold" />
  ),
  Display: (props: TextProps) => (
    <TextBase {...props} className={clsx("text-3xl", props.className)} weight="bold" />
  ),
  Meta: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-xs", props.className)} tone="muted" />
  ),
  Micro: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-sm", props.className)} />
  ),
  LabelSoft: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-sm", props.className)} weight="medium" />
  ),
  Highlight: (props: TextProps) => (
    <TextBase {...props} as="span" className={clsx("text-sm", props.className)} tone="accent" weight="semibold" />
  ),
};