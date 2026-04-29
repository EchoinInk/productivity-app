import clsx from "clsx";
import type { TextProps } from "./Text.types";
import { weightMap, toneClass, size } from "./Text.types";

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

// HERO
export function HeroTitle(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.heroTitle, props.className)}
      weight="semibold"
      tone={props.tone ?? "onColor"}
    />
  );
}

export function HeroSubtext(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.heroSub, props.className)}
      tone="onColor"
    />
  );
}

export function HeroSupport(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.heroSupport, props.className)}
      tone="onColor"
    />
  );
}

// METRIC (Money)
export function Metric(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.metric, props.className)}
      weight="semibold"
    />
  );
}

export function MetricLabel(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.metricLabel, props.className)}
      tone="muted"
    />
  );
}

// HEADINGS
export function Heading(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.heading, props.className)}
      weight="semibold"
    />
  );
}

// BODY
export function Body(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.body, props.className)}
    />
  );
}

export function BodyMuted(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.bodyMuted, props.className)}
      tone="muted"
    />
  );
}

export function BodyStrong(props: TextProps) {
  return (
    <TextBase
      {...props}
      className={clsx(size.bodyStrong, props.className)}
      weight="semibold"
    />
  );
}

// CTA
export function CTA(props: TextProps) {
  return (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.cta, props.className)}
      weight="semibold"
    />
  );
}

// LABEL
export function Label(props: TextProps) {
  return (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.label, props.className)}
      tone="muted"
    />
  );
}

// UNIVERSAL
export { TextBase as Text };

export function Meta(props: TextProps) {
  return (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.meta, props.className)}
      tone="muted"
    />
  );
}

export function LabelSoft(props: TextProps) {
  return (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.labelSoft, props.className)}
      weight="medium"
    />
  );
}

export function Highlight(props: TextProps) {
  return (
    <TextBase
      {...props}
      as="span"
      className={clsx(size.highlight, props.className)}
      tone="accent"
      weight="semibold"
    />
  );
}
