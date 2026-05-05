module.exports = {
  root: true,
  env: {
    node: true,
  },

  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint", "react", "regex"],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    /**
     * 🔒 DESIGN SYSTEM ENFORCEMENT
     */
    "regex/invalid": [
      "error",
      [
        {
          regex: "#[0-9a-fA-F]{3,8}",
          message: "❌ No hex colors. Use tokens.",
        },
        {
          regex: "rgba?\\(",
          message: "❌ No rgba(). Use tokens.",
        },
        {
          regex: "hsl\\(",
          message: "❌ No hsl(). Use tokens.",
        },
        {
          regex: "text-(white|black|gray|red|blue|green|yellow|pink|purple)",
          message: "❌ No Tailwind palette. Use semantic tokens.",
        },
        {
          regex: "bg-(white|black|gray|red|blue|green|yellow|pink|purple)",
          message: "❌ No Tailwind palette. Use semantic tokens.",
        },
        {
          regex: "border-(white|black|gray|red|blue|green|yellow|pink|purple)",
          message: "❌ No Tailwind palette. Use semantic tokens.",
        },
        {
          regex: "muted-foreground",
          message: "❌ Use text-muted instead.",
        },
      ],
    ],
    "react/react-in-jsx-scope": "off",
  },

  overrides: [
    {
      files: ["src/theme/tokens.ts"],
      rules: {
        "regex/invalid": "off",
      },
    },
  ],
};