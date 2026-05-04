/**
 * Lumo Design Tokens — Single Source of Truth
 *
 * Rules:
 * - No raw hex values outside this file
 * - Import from this file only
 * - No duplication, no legacy aliases
 */

export const tokens = {
  colors: {
    brand: {
      sky: "#28D9FF",
      indigo: "#4F46E5",
      violet: "#8B5CF6",
      magenta: "#FF4DD8",
      coral: "#FF7A59",
      lime: "#22D3A7",
    },
    surface: {
      background: "#F1F5F9",
      default: "#FFFFFF",
      elevated: "#F2F4FA",
    },
    text: {
      primary: "#0F172A",
      secondary: "#647488",
      muted: "#94A3BB",
    },
    border: "#E5E7E8",
    semantic: {
      success: "#22C55E",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#0EA5E9",
      primary: "#4F46E5",
      secondary: "#28D9FF",
      accent: "#FF4DD8",
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #28D9FF 0%, #4F46E5 45%, #FF4DD8 100%)",
    signature: "linear-gradient(135deg, #2BD9FF 0%, #6366F1 50%, #FF4DD8 100%)",
    soft: "linear-gradient(135deg, #2BD9FF 0%, #8B5CF6 100%)",
    accent: "linear-gradient(135deg, #8B5CF6 0%, #FF4DD8 100%)",
    action: "linear-gradient(135deg, #2BD9FF 0%, #4F46E5 100%)",
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
    button: "0 2px 4px rgba(79, 70, 229, 0.15)",
    focus: "0 0 0 3px rgba(79, 70, 229, 0.2)",
  },
} as const;

export type Tokens = typeof tokens;
