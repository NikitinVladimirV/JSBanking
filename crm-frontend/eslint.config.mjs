import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPrettierPlugin from "eslint-plugin-prettier/recommended";

export default [
  pluginJs.configs.recommended,
  eslintPrettierPlugin,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-var": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prefer-const": "error",
    },
  },
];
