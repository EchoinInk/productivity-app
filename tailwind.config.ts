import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

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
        soft: "0 1px var(--space-1) rgba(0,0,0,0.2)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-budget": "var(--gradient-budget)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-data": "var(--gradient-data)",
        "gradient-page": "var(--gradient-page)",
        "gradient-date-pill": "var(--gradient-date-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glass: "var(--shadow-glass)",
        surface: "var(--shadow-surface)",
        soft: "var(--shadow-soft)",
        pop: "var(--shadow-pop)",
        cta: "var(--shadow-cta)",
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
  },
  ],
} satisfies Config;
