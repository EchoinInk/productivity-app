import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config";
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
        sky: "#28D9FF",
        indigo: "#4F46E5",
        violet: "#8B5CF6",
        magenta: "#FF4DD8",
        coral: "#FF7A59",
        lime: "#22D3A7",
        // Light mode surfaces
        background: "#F1F5F9",
        surface: "#FFFFFF",
        "surface-elevated": "#F2F4FA",
        // Semantic colors
        primary: {
          DEFAULT: "#4F46E5",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#28D9FF",
          foreground: "#0F172A",
        },
        accent: {
          DEFAULT: "#FF4DD8",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#0F172A",
        },
        info: {
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
        // Text colors
        "text-primary": "#0F172A",
        "text-secondary": "#647488",
        "text-muted": "#94A3BB",
        // Utility colors
        border: "#E5E7E8",
        muted: "#C8D5E1",
        ring: "#4F46E5",
        input: "#E5E7E8",
        // Legacy support
        foreground: "#0F172A",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
      },
      backgroundImage: {
        // Brand gradients
        "gradient-primary": "linear-gradient(135deg, #28D9FF 0%, #4F46E5 45%, #FF4DD8 100%)",
        "gradient-signature": "linear-gradient(135deg, #2BD9FF 0%, #6366F1 50%, #FF4DD8 100%)",
        "gradient-soft": "linear-gradient(135deg, #2BD9FF 0%, #8B5CF6 100%)",
        "gradient-accent": "linear-gradient(135deg, #8B5CF6 0%, #FF4DD8 100%)",
        "gradient-action": "linear-gradient(135deg, #2BD9FF 0%, #4F46E5 100%)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        elevated: "0 4px 6px -1px rgba(15, 23, 42, 0.08)",
        button: "0 2px 4px rgba(79, 70, 229, 0.15)",
        focus: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - var(--space-1))",
        sm: "calc(var(--radius) - var(--space-2))",
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
