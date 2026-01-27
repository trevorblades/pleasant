import css from "@eslint/css";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { tailwind4 } from "tailwind-csstree";
import tseslint from "typescript-eslint";

export default defineConfig(
  prettier,
  betterTailwindcss.configs.recommended,
  {
    files: ["**/*.css"],
    language: "css/css",
    extends: ["css/recommended"],
    plugins: { css },
    languageOptions: {
      tolerant: true,
      customSyntax: tailwind4,
    },
    rules: {
      "css/use-baseline": ["error", { allowSelectors: ["nesting"] }],
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,astro}"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      ...astro.configs.recommended,
      ...astro.configs["jsx-a11y-recommended"],
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "better-tailwindcss/no-unknown-classes": [
        "error",
        { detectComponentClasses: true },
      ],
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles/global.css",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat["recommended-latest"],
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
