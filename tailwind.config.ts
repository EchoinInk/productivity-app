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
        // Remove default Tailwind palette by overriding with tokens only
        // Brand colors
        sky: tokens.colors.brand.sky,
        indigo: tokens.colors.brand.indigo,
        violet: tokens.colors.brand.violet,
        magenta: tokens.colors.brand.magenta,
        coral: tokens.colors.brand.coral,
        lime: tokens.colors.brand.lime,
        // Surfaces
        background: tokens.colors.surface.light.background,
        surface: tokens.colors.surface.light.default,
        "surface-elevated": tokens.colors.surface.light.elevated,
        // Text colors
        "text-primary": tokens.colors.text.light.primary,
        "text-secondary": tokens.colors.text.light.secondary,
        "text-muted": tokens.colors.text.light.muted,
        "text-on-primary": tokens.colors.text.light.onPrimary,
        // Border
        "border-default": tokens.colors.border.light,
        // Semantic colors
        primary: {
          DEFAULT: tokens.colors.brand.sky,
          foreground: tokens.colors.text.light.onPrimary,
        },
        secondary: {
          DEFAULT: tokens.colors.brand.indigo,
          foreground: tokens.colors.text.light.primary,
        },
        accent: {
          DEFAULT: tokens.colors.brand.violet,
          foreground: tokens.colors.text.light.onPrimary,
        },
        success: {
          DEFAULT: tokens.colors.semantic.success,
          foreground: tokens.colors.text.light.onPrimary,
        },
        error: {
          DEFAULT: tokens.colors.semantic.error,
          foreground: tokens.colors.text.light.onPrimary,
        },
        warning: {
          DEFAULT: tokens.colors.semantic.warning,
          foreground: tokens.colors.text.light.primary,
        },
        info: {
          DEFAULT: tokens.colors.semantic.info,
          foreground: tokens.colors.text.light.onPrimary,
        },
        muted: {
          DEFAULT: tokens.colors.text.light.muted,
          foreground: tokens.colors.text.light.primary,
        },
        // Legacy support (mapped to tokens)
        foreground: tokens.colors.text.light.primary,
        muted: tokens.colors.text.light.muted,
        ring: tokens.colors.brand.sky,
        input: tokens.colors.border.light,
        destructive: {
          DEFAULT: tokens.colors.semantic.error,
          foreground: tokens.colors.text.light.onPrimary,
        },
        card: {
          DEFAULT: tokens.colors.surface.light.default,
          foreground: tokens.colors.text.light.primary,
        },
        popover: {
          DEFAULT: tokens.colors.surface.light.default,
          foreground: tokens.colors.text.light.primary,
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
safelist: [
  "bg-primary",
  "bg-accent",
  "bg-success",
  "bg-error",
  "bg-warning",
  "bg-info",
  "bg-muted",

  "text-primary",
  "text-accent",
  "text-success",
  "text-error",
  "text-warning",
  "text-info",
  "text-muted",

  "border-primary",
  "border-accent",
  "border-success",
  "border-error",
  "border-warning",
  "border-info",
  "border-muted",
]

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
