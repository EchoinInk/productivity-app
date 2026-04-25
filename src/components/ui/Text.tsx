import clsx from "clsx";
import { type HTMLAttributes } from "react";
import { semanticColors } from "@/theme";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Tone = "default" | "soft" | "muted" | "accent" | "danger" | "success";
type Align = "left" | "center" | "right";
type Transform = "none" | "uppercase" | "capitalize";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  weight?: Weight;
  tone?: Tone;
  align?: Align;
  truncate?: boolean;
  noWrap?: boolean;
  transform?: Transform;
  leading?: "tight" | "snug" | "normal" | "relaxed";
  tracking?: "tight" | "normal" | "wide" | "wider";
};

const weightMap: Record<Weight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

// Tone → either a CSS color string (used in inline style) or `null` to fall
// back to a Tailwind class. We keep semantic palette colors for `soft` and
// `accent` (brand voice) and lean on design-system tokens for the rest.
const toneColor: Record<Tone, string | null> = {
  default: null,
  soft: semanticColors.softText,
  muted: null,
  accent: semanticColors.accentText,
  danger: null,
  success: null,
};

const toneClass: Record<Tone, string> = {
  default: "text-foreground",
  soft: "",
  muted: "text-muted-foreground",
  accent: "",
  danger: "text-destructive",
  success: "text-accent",
};

const leadingMap = {
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

const trackingMap = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
};

// Standardised mobile-friendly font scale
const size = {
  display: "text-3xl",
  headingXL: "text-2xl",
  headingL: "text-xl",
  headingM: "text-lg",
  headingS: "text-base",
  body: "text-sm",
  label: "text-sm",
  micro: "text-xs",
  meta: "text-[11px]",
};

function TextBase({
  as = "p",
  className,
  weight = "regular",
  tone = "default",
  align = "left",
  truncate = false,
  noWrap = false,
  transform = "none",
  leading = "snug",
  tracking = "normal",
  style,
  ...props
}: TextProps) {
  const Component = as as "p";
  const inlineColor = toneColor[tone];

  return (
    <Component
      className={clsx(
        weightMap[weight],
        leadingMap[leading],
        trackingMap[tracking],
        toneClass[tone],
        {
          truncate: truncate,
          "whitespace-nowrap": noWrap,
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
          uppercase: transform === "uppercase",
          capitalize: transform === "capitalize",
        },
        className,
      )}
      style={inlineColor ? { color: inlineColor, ...style } : style}
      {...props}
    />
  );
}

export const UIText = {
  // DISPLAY
  Display: (props: TextProps) => (
    <TextBase {...props} as={props.as ?? "span"} className={clsx(size.display, props.className)} weight="bold" />
  ),

  DisplaySoft: (props: TextProps) => (
    <TextBase
      {...props}
      as={props.as ?? "span"}
      className={clsx(size.display, "text-shadow-soft", props.className)}
      weight="bold"
      tone="soft"
    />
  ),

  // HEADINGS
  HeadingXL: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.headingXL, props.className)} weight="bold" />
  ),

  HeadingL: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.headingL, props.className)} weight="semibold" />
  ),

  HeadingM: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.headingM, props.className)} weight="semibold" />
  ),

  HeadingS: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.headingS, props.className)} weight="medium" />
  ),

  // BODY
  Body: (props: TextProps) => <TextBase {...props} className={clsx(size.body, props.className)} />,

  BodySoft: (props: TextProps) => <TextBase {...props} className={clsx(size.body, props.className)} tone="soft" />,

  BodyStrong: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.body, props.className)} weight="semibold" />
  ),

  // LABELS
  Label: (props: TextProps) => (
    <TextBase {...props} as={props.as ?? "span"} className={clsx(size.label, props.className)} weight="medium" />
  ),

  LabelSoft: (props: TextProps) => (
    <TextBase
      {...props}
      as={props.as ?? "span"}
      className={clsx(size.label, props.className)}
      weight="medium"
      tone="soft"
    />
  ),

  LabelStrong: (props: TextProps) => (
    <TextBase {...props} as={props.as ?? "span"} className={clsx(size.label, props.className)} weight="semibold" />
  ),

  // MICROCOPY
  Micro: (props: TextProps) => (
    <TextBase {...props} className={clsx(size.micro, props.className)} weight="medium" tone="muted" />
  ),

  Meta: (props: TextProps) => <TextBase {...props} className={clsx(size.meta, props.className)} tone="muted" />,

  Highlight: (props: TextProps) => (
    <TextBase
      {...props}
      as={props.as ?? "span"}
      className={clsx(size.meta, props.className)}
      weight="medium"
      tone="accent"
    />
  ),

  // UNIVERSAL
  Text: TextBase,
};
