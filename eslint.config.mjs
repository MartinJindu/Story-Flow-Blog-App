// eslint.config.mjs

import next from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      "@next/next": next,
    },
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...next.configs.recommended.rules,

      ...tseslint.configs.recommended.rules,

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-unused-vars": "off", // Disable default ESLint rule
    },
  },
];
