/**
 * Design tokens — Lumo Brand System
 * SOURCE OF TRUTH for all colors, spacing, typography, and effects.
 *
 * RULES:
 * 1. Never hard-code hex/HSL in components. Use tokens or Tailwind classes.
 * 2. No Tailwind default colors in components.
 * 3. Gradients ONLY for primary buttons and progress bars.
 */

// ============================================================================
// BRAND COLORS — FINAL
// ============================================================================

export const brand = {
  sky: "#28D9FF",
  indigo: "#4F46E5",
  violet: "#8B5CF6",
  magenta: "#FF4DD8",
  coral: "#FF7A59",
  lime: "#22D3A7",
} as const;

export type BrandColor = keyof typeof brand;

// ============================================================================
// GRADIENTS — FINAL
// ============================================================================

export const gradients = {
  /** Primary gradient for buttons and emphasis */
  primary: "linear-gradient(135deg, #28D9FF 0%, #4F46E5 45%, #FF4DD8 100%)",
  /** Signature brand gradient */
  signature: "linear-gradient(135deg, #2BD9FF 0%, #6366F1 50%, #FF4DD8 100%)",
  /** Soft accent gradient */
  soft: "linear-gradient(135deg, #2BD9FF 0%, #8B5CF6 100%)",
  /** Accent gradient (violet to magenta) */
  accent: "linear-gradient(135deg, #8B5CF6 0%, #FF4DD8 100%)",
  /** Action gradient (sky to indigo) */
  action: "linear-gradient(135deg, #2BD9FF 0%, #4F46E5 100%)",
} as const;

export type GradientToken = keyof typeof gradients;

// ============================================================================
// LIGHT MODE — PRIMARY
// ============================================================================

export const lightMode = {
  background: "#F1F5F9",
  surface: "#FFFFFF",
  surfaceElevated: "#F2F4FA",
  border: "#E5E7E8",
  muted: "#C8D5E1",
  textPrimary: "#0F172A",
  textSecondary: "#647488",
  textMuted: "#94A3BB",
} as const;

// ============================================================================
// DARK MODE — FUTURE SUPPORT
// ============================================================================

export const darkMode = {
  background: "#0F1220",
  surface: "#161A2E",
  surfaceElevated: "#1D233D",
  border: "#2A314D",
} as const;

// ============================================================================
// SEMANTIC COLORS
// ============================================================================

export const semantic = {
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#0EA5E9",
  primary: "#4F46E5",
  secondary: "#28D9FF",
  accent: "#FF4DD8",
} as const;

export type SemanticToken = keyof typeof semantic;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
  elevated: "0 4px 6px -1px rgba(15, 23, 42, 0.08)",
  button: "0 2px 4px rgba(79, 70, 229, 0.15)",
  focus: "0 0 0 3px rgba(79, 70, 229, 0.2)",
} as const;

export type ShadowToken = keyof typeof shadows;

// ============================================================================
// SPACING SCALE — Mobile-first (4px base)
// ============================================================================

export const spacing = {
  0: "0rem",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem",    // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem",     // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem",    // 12px
  3.5: "0.875rem", // 14px
  4: "1rem",       // 16px
  5: "1.25rem",    // 20px
  6: "1.5rem",     // 24px
  8: "2rem",       // 32px
  10: "2.5rem",    // 40px
  12: "3rem",      // 48px
  16: "4rem",      // 64px
} as const;

export const space = {
  xs: spacing[1],      // 4px
  sm: spacing[2],      // 8px
  md: spacing[3],      // 12px
  lg: spacing[4],      // 16px
  xl: spacing[6],      // 24px
  section: spacing[6], // 24px
} as const;

export type SpacingToken = keyof typeof spacing;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const radius = {
  none: "0",
  sm: "0.375rem",  // 6px
  md: "0.5rem",    // 8px
  lg: "0.75rem",   // 12px
  xl: "1rem",      // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  xs: { size: "0.75rem", lineHeight: "1rem", letterSpacing: "0" },      // 12 / 16
  sm: { size: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0" },   // 14 / 20
  base: { size: "1rem", lineHeight: "1.5rem", letterSpacing: "0" },    // 16 / 24
  lg: { size: "1.125rem", lineHeight: "1.75rem", letterSpacing: "-0.01em" }, // 18 / 28
  xl: { size: "1.25rem", lineHeight: "1.75rem", letterSpacing: "-0.01em" },  // 20 / 28
  "2xl": { size: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.02em" },  // 24 / 32
  "3xl": { size: "1.875rem", lineHeight: "2.25rem", letterSpacing: "-0.02em" }, // 30 / 36
} as const;

export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;

// ============================================================================
// MOTION
// ============================================================================

export const motion = {
  duration: {
    fast: 150,
    base: 200,
    slow: 300,
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

// ============================================================================
// SURFACE TOKENS — For backgrounds and layers
// ============================================================================

export const surfaces = {
  /** Main app background */
  background: lightMode.background,
  /** Card/container surface */
  surface: lightMode.surface,
  /** Elevated surface (cards, modals) */
  elevated: lightMode.surfaceElevated,
  /** Muted/subtle background */
  muted: lightMode.muted,
} as const;

export type SurfaceToken = keyof typeof surfaces;

// ============================================================================
// TEXT COLORS
// ============================================================================

export const textColors = {
  primary: lightMode.textPrimary,
  secondary: lightMode.textSecondary,
  muted: lightMode.textMuted,
  inverse: lightMode.surface,
} as const;

// ============================================================================
// AGGREGATED EXPORT
// ============================================================================

export const tokens = {
  brand,
  gradients,
  lightMode,
  darkMode,
  semantic,
  shadows,
  spacing,
  space,
  radius,
  fontFamily,
  fontWeight,
  fontSize,
  motion,
  surfaces,
  textColors,
} as const;

export type Tokens = typeof tokens;
