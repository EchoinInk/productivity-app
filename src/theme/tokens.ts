/**
 * Design tokens — typed TypeScript mirror of the CSS-variable design system
 * defined in `src/index.css` and consumed by `tailwind.config.ts`.
 *
 * SOURCE OF TRUTH
 * ---------------
 * CSS variables in `src/index.css` remain the single source of truth at
 * runtime. Tailwind classes (`bg-primary`, `text-foreground`, `rounded-lg`,
 * etc.) resolve to those variables and should be preferred in JSX.
 *
 * WHEN TO USE THIS FILE
 * ---------------------
 * Use these constants only when Tailwind classes cannot reach the value:
 *   - SVG `stroke` / `fill` attributes
 *   - Inline `style={{ ... }}` values driven by computed numbers
 *   - Chart libraries, canvas, third-party widgets that need raw colors
 *   - Animation/transition timings shared across components
 *
 * RULES
 * -----
 * 1. Never hard-code hex/HSL in components. Reference these tokens or use a
 *    Tailwind class.
 * 2. Color values are HSL strings ready for `hsl(...)` or `hsl(... / 0.x)`.
 * 3. If you change a value here, mirror it in `src/index.css` (and vice
 *    versa). Drift between the two is a bug.
 */

// ---------------------------------------------------------------------------
// Colors — HSL triplets matching CSS custom properties in src/index.css
// ---------------------------------------------------------------------------

export const colors = {
  background: "220 20% 97%",
  foreground: "220 20% 10%",

  card: "0 0% 100%",
  cardForeground: "220 20% 10%",

  popover: "0 0% 100%",
  popoverForeground: "220 20% 10%",

  primary: "220 80% 56%",
  primaryForeground: "0 0% 100%",

  secondary: "220 14% 92%",
  secondaryForeground: "220 10% 33%",

  muted: "220 14% 95%",
  mutedForeground: "220 10% 46%",

  accent: "160 60% 45%",
  accentForeground: "0 0% 100%",

  warning: "38 92% 50%",
  warningForeground: "0 0% 100%",
  success: "160 60% 40%",
  successForeground: "0 0% 100%",

  destructive: "0 72% 56%",
  destructiveForeground: "0 0% 100%",

  border: "220 14% 90%",
  input: "220 14% 90%",
  ring: "220 80% 56%",
} as const;

export type ColorToken = keyof typeof colors;

/** Wrap a token in `hsl(...)` for direct use in style attributes / SVG. */
export const hsl = (token: ColorToken, alpha?: number): string =>
  alpha === undefined ? `hsl(${colors[token]})` : `hsl(${colors[token]} / ${alpha})`;

/** Reference a CSS variable. Preferred over `hsl()` when the value should
 *  participate in theming/dark-mode swaps at runtime. */
export const cssVar = (token: ColorToken, alpha?: number): string => {
  const name = `--${token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
  return alpha === undefined ? `hsl(var(${name}))` : `hsl(var(${name}) / ${alpha})`;
};

// ---------------------------------------------------------------------------
// Gradients — match `--gradient-*` in src/index.css
// ---------------------------------------------------------------------------

export const gradients = {
  primary: "linear-gradient(135deg, hsl(220 80% 56%), hsl(240 70% 62%))",
  accent: "linear-gradient(135deg, hsl(160 60% 45%), hsl(180 50% 50%))",
  budget: "linear-gradient(135deg, hsl(220 80% 56%), hsl(200 80% 50%))",
} as const;

export type GradientToken = keyof typeof gradients;

export const brandGradientStops = {
  primary: ["#a4f0e8", "#c0d3f0", "#c7c9f4", "#ddc9eb", "#f7d0d0"],
  secondary: ["#b4fdf6", "#cde0f7", "#d4d7fb", "#e9d7f3", "#ffe2e2"],
  tertiary: ["#b0f7f3", "#c0d0f3", "#c7c9f6", "#ded0e7", "#f6d0d0"],
  quaternary: ["#b2f4ee", "#c4d4f0", "#cfcdf5", "#e2d2eb", "#f7d2d2"],
} as const;

export const brandGradients = {
  primary: `linear-gradient(165deg, ${brandGradientStops.primary.join(", ")})`,
  secondary: `linear-gradient(-150deg, ${brandGradientStops.secondary.join(", ")})`,
  tertiary: `linear-gradient(130deg, ${brandGradientStops.tertiary.join(", ")})`,
  quaternary: `linear-gradient(110deg, ${brandGradientStops.quaternary.join(", ")})`,
  page: "linear-gradient(145deg, #ffffff 0%, #f3f6ff 50%, #eef2ff 100%)",
  datePill: "linear-gradient(130deg, rgba(219,234,254,0.7), rgba(233,213,255,0.7))",
  billWarm: "linear-gradient(135deg,#FFE7D1,#FADCEB)",
  billCool: "linear-gradient(135deg,#F8DFFF,#E7D9FF)",
  billBlue: "linear-gradient(135deg,#D1F0FF,#E0E7FF)",
} as const;

export const semanticColors = {
  softText: "#5A626D",
  accentText: "#7C8BC4",
  billWarm: "#C99BB8",
  billCool: "#9B8AC4",
} as const;


// ---------------------------------------------------------------------------
// Shadows — match `--shadow-*` in src/index.css
// ---------------------------------------------------------------------------

export const shadows = {
  card: "0 1px 3px 0 hsl(220 20% 10% / 0.04), 0 1px var(--space-1) -1px hsl(220 20% 10% / 0.04)",
  elevated: "0 var(--space-2) var(--space-5) calc(-1 * var(--space-1)) hsl(220 20% 10% / 0.08)",
  glass: "0 3px 14px hsl(220 80% 70% / 0.22)",
  surface: "0 var(--space-3) 18px hsl(240 40% 60% / 0.18)",
} as const;

export type ShadowToken = keyof typeof shadows;


// ---------------------------------------------------------------------------
// Spacing scale — values in rem, mirroring Tailwind's default 4px-based scale
// Use Tailwind classes (p-2, gap-4, ...) in JSX; use this map only when you
// need the raw number (e.g. virtualized list item heights, animations).
// ---------------------------------------------------------------------------

export const spacing = {
  0: "0rem",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

export const space = {
  tight: spacing[2],     // 8px
  default: spacing[3],   // 12px
  section: spacing[4],   // 16px
  block: spacing[6],     // 24px
} as const;

export type SpacingToken = keyof typeof spacing;

// ---------------------------------------------------------------------------
// Surfaces — semantic background layers used across the UI.
// These map visual hierarchy (hero, cards, data, etc.) to consistent
// background treatments (gradients, glass, elevated surfaces).
//
// USAGE
// -----
// - Use these instead of raw colors or gradients in components.
// - Ensures consistent layering, depth, and theming.
// - Prefer `surfaces.*` over hardcoded `bg-*` or inline gradients.
//
// MAPPING
// -------
// hero     → Primary gradient (top-level emphasis)
// data     → Secondary gradient (metrics, highlights)
// glass    → Frosted card background
// elevated → Stronger solid surface
// subtle   → Low-emphasis background
// page     → App background gradient
// ---------------------------------------------------------------------------

export const surfaces = {
  // Frosted glass card background
  glass: "hsl(var(--card) / 0.8)",

  // Stronger, more opaque surface
  elevated: "hsl(var(--card) / 0.95)",

  // Subtle background (sections, soft containers)
  subtle: "hsl(var(--muted))",

  // HERO (primary emphasis)
  hero: brandGradients.primary,

  // DATA (secondary emphasis, e.g. money card)
  data: brandGradients.secondary,

  // Full page background
  page: brandGradients.page,
} as const;

export type SurfaceToken = keyof typeof surfaces;

// ---------------------------------------------------------------------------
// Border radius — derived from `--radius: 0.75rem` in src/index.css.
// Tailwind exposes these as `rounded-sm | rounded-md | rounded-lg`.
// ---------------------------------------------------------------------------

export const radius = {
  none: "0",
  sm: "0.5rem", // calc(var(--radius) - 4px)  → 8px
  md: "0.625rem", // calc(var(--radius) - 2px) → 10px
  lg: "0.75rem", // var(--radius)              → 12px
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;

// ---------------------------------------------------------------------------
// Typography — font family, weight, and modular type scale.
// JSX should use Tailwind classes (text-sm, font-semibold). Use these when a
// non-CSS context needs the raw value (canvas text, SVG <text>, charts).
// ---------------------------------------------------------------------------

export const fontFamily = {
  sans: '"Montserrat", system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  xs: { size: "0.75rem", lineHeight: "1rem" }, // 12 / 16
  sm: { size: "0.875rem", lineHeight: "1.25rem" }, // 14 / 20
  base: { size: "1rem", lineHeight: "1.5rem" }, // 16 / 24
  lg: { size: "1.125rem", lineHeight: "1.75rem" }, // 18 / 28
  xl: { size: "1.25rem", lineHeight: "1.75rem" }, // 20 / 28
  "2xl": { size: "1.5rem", lineHeight: "2rem" }, // 24 / 32
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" }, // 30 / 36
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" }, // 36 / 40
} as const;

export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;

// ---------------------------------------------------------------------------
// Motion — shared animation/transition primitives
// ---------------------------------------------------------------------------

export const motion = {
  duration: {
    fast: 150,
    base: 200,
    slow: 400,
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

// ---------------------------------------------------------------------------
// Z-index scale
// ---------------------------------------------------------------------------

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 40,
  modal: 50,
  toast: 60,
} as const;

export type ZIndexToken = keyof typeof zIndex;

// ---------------------------------------------------------------------------
// Aggregated export
// ---------------------------------------------------------------------------

export const tokens = {
  colors,
  gradients,
  brandGradients,
  brandGradientStops,
  semanticColors,
  shadows,
  spacing,
  radius,
  fontFamily,
  fontWeight,
  fontSize,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;
