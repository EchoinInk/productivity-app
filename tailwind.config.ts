import type { Config } from "tailwindcss";
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

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "430px", // mobile-first constraint
      },
    },

    extend: {
      colors: {
        /* SURFACE (CSS VARIABLES) */
        background: "var(--bg)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",

        /* TEXT */
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-on-primary": "var(--text-on-primary)",

        /* BORDER */
        "border-default": "var(--border)",

        /* SEMANTIC */
        primary: {
          DEFAULT: tokens.colors.brand.sky,
        },
        secondary: {
          DEFAULT: tokens.colors.brand.indigo,
        },
        accent: {
          DEFAULT: tokens.colors.brand.violet,
        },
        success: {
          DEFAULT: tokens.colors.semantic.success,
        },
        error: {
          DEFAULT: tokens.colors.semantic.error,
        },
        warning: {
          DEFAULT: tokens.colors.semantic.warning,
        },
        info: {
          DEFAULT: tokens.colors.semantic.info,
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
        sm: tokens.radius.sm,
        md: tokens.radius.md,
        lg: tokens.radius.lg,
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

  safelist: [
    "bg-primary",
    "bg-accent",
    "bg-success",
    "bg-error",
    "bg-warning",
    "bg-info",

    "text-primary",
    "text-accent",
    "text-success",
    "text-error",
    "text-warning",
    "text-info",

    "border-primary",
    "border-accent",
    "border-success",
    "border-error",
    "border-warning",
    "border-info",
  ],

  plugins: [
    tailwindcssAnimate,

    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
} satisfies Config;