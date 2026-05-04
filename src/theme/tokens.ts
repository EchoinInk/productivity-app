/**
 * Lumo Design Tokens — Single Source of Truth
 *
 * Rules:
 * - No raw hex values outside this file
 * - Import from this file only
 * - No duplication, no legacy aliases
 */

const brand = {
  sky: "#28D9FF",
  indigo: "#4F46E5",
  violet: "#8B5CF6",
  magenta: "#FF4DD8",
  coral: "#FF7A59",
  lime: "#22D3A7",
} as const;

export const tokens = {
  colors: {
    brand,
    surface: {
      light: {
        background: "#F1F5F9",
        default: "#FFFFFF",
        elevated: "#F2F4FA",
      },
      dark: {
        background: "#0F1220",
        default: "#161A2E",
        elevated: "#1D233D",
      },
    },
    text: {
      light: {
        primary: "#0F172A",
        secondary: "#647488",
        muted: "#94A3BB",
      },
      dark: {
        primary: "#F8FAFC",
        secondary: "#94A3BB",
        muted: "#647488",
      },
    },
    border: {
      light: "#E5E7E8",
      dark: "#2A314D",
    },
    semantic: {
      success: "#22C55E",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#0EA5E9",
    },
  },
  gradients: {
    primary: `linear-gradient(135deg, ${brand.sky} 0%, ${brand.indigo} 45%, ${brand.magenta} 100%)`,
    signature: `linear-gradient(135deg, ${brand.sky} 0%, ${brand.indigo} 50%, ${brand.magenta} 100%)`,
    soft: `linear-gradient(135deg, ${brand.sky} 0%, ${brand.violet} 100%)`,
    accent: `linear-gradient(135deg, ${brand.violet} 0%, ${brand.magenta} 100%)`,
    action: `linear-gradient(135deg, ${brand.sky} 0%, ${brand.indigo} 100%)`,
  },
  spacing: {
    0: "0rem",
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
  },
  radius: {
    none: "0",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
    elevated: "0 4px 6px -1px rgba(15, 23, 42, 0.08)",
    button: `0 2px 4px ${brand.indigo}26`,
    focus: `0 0 0 3px ${brand.indigo}33`,
  },
  opacity: {
    disabled: 0.5,
    subtle: 0.08,
    overlay: 0.4,
  },
} as const;

export type Tokens = typeof tokens;
