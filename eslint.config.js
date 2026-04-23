import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  // ✅ GLOBAL CONFIG (no restrictions here)
  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },

  // 🔥 UI-ONLY RESTRICTION
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],

    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*"],
              message: "UI components must not import from features",
            },
          ],
        },
      ],
    },
  },
];