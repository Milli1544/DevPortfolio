import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        __dirname: "readonly",
        process: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Relaxed rules for development
      "no-unused-vars": "warn", // Changed from 'error' to 'warn'
      "no-console": "off", // Allow console.log for development
      "prefer-const": "warn",
      "no-var": "error",
      // React specific rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error", // This will properly detect JSX usage
      "react/prop-types": "off", // Disable prop-types for development
      "react/no-unescaped-entities": "off", // Allow apostrophes in text
    },
  },
  // Cypress specific configuration
  {
    files: ["cypress/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        // Cypress globals
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        before: "readonly",
        after: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },
    rules: {
      // Disable rules that don't make sense for Cypress tests
      "no-unused-vars": "off",
      "no-console": "off",
      "prefer-const": "warn",
      "no-var": "error",
      // Allow function expressions in Cypress
      "func-names": "off",
      // Allow arrow functions without parentheses
      "arrow-parens": "off",
    },
  },
];
