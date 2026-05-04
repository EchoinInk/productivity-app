import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config";
import { tokens } from "./src/theme/tokens";
const tailwindcssAnimate = require("tailwindcss-animate");

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.2)",
      },
      colors: {
        // Brand colors
        sky: tokens.colors.brand.sky,
        indigo: tokens.colors.brand.indigo,
        violet: tokens.colors.brand.violet,
        magenta: tokens.colors.brand.magenta,
        coral: tokens.colors.brand.coral,
        lime: tokens.colors.brand.lime,
        // Surfaces
        background: tokens.colors.surface.background,
        surface: tokens.colors.surface.default,
        "surface-elevated": tokens.colors.surface.elevated,
        // Text colors
        "text-primary": tokens.colors.text.primary,
        "text-secondary": tokens.colors.text.secondary,
        "text-muted": tokens.colors.text.muted,
        // Border
        border: tokens.colors.border,
        // Semantic colors
        primary: {
          DEFAULT: tokens.colors.semantic.primary,
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: tokens.colors.semantic.secondary,
          foreground: tokens.colors.text.primary,
        },
        accent: {
          DEFAULT: tokens.colors.semantic.accent,
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: tokens.colors.semantic.success,
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: tokens.colors.semantic.error,
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: tokens.colors.semantic.warning,
          foreground: tokens.colors.text.primary,
        },
        info: {
          DEFAULT: tokens.colors.semantic.info,
          foreground: "#FFFFFF",
        },
        // Legacy support (mapped to tokens)
        foreground: tokens.colors.text.primary,
        muted: tokens.colors.text.muted,
        ring: tokens.colors.semantic.primary,
        input: tokens.colors.border,
        destructive: {
          DEFAULT: tokens.colors.semantic.error,
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: tokens.colors.surface.default,
          foreground: tokens.colors.text.primary,
        },
        popover: {
          DEFAULT: tokens.colors.surface.default,
          foreground: tokens.colors.text.primary,
        },
      },
      backgroundImage: {
        "gradient-primary": tokens.gradients.primary,
        "gradient-signature": tokens.gradients.signature,
        "gradient-soft": tokens.gradients.soft,
        "gradient-accent": tokens.gradients.accent,
        "gradient-action": tokens.gradients.action,
      },
      boxShadow: {
        card: tokens.shadows.card,
        elevated: tokens.shadows.elevated,
        button: tokens.shadows.button,
        focus: tokens.shadows.focus,
      },
      borderRadius: {
        lg: tokens.radius.lg,
        md: tokens.radius.md,
        sm: tokens.radius.sm,
        xl: tokens.radius.xl,
        "2xl": tokens.radius["2xl"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

plugins: [
  tailwindcssAnimate,

  function ({ addUtilities, theme }: PluginAPI) {
    const shadows = theme("textShadow") as Record<string, string>;
    const utilities = Object.fromEntries(
      Object.entries(shadows).map(([key, value]) => [
        `.text-shadow-${key}`,
        { textShadow: value },
      ])
    );
    addUtilities(utilities);
    
    // Add scrollbar-hide utility
    addUtilities({
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    });
  },
  ],
} satisfies Config;
