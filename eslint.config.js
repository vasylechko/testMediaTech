import vueParser from "vue-eslint-parser";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  pluginPrettier,
  {
    languageOptions: {
      parser: vueParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    ignores: ["node_modules/", "dist/"],
    rules: {
      "no-useless-escape": "off",
      "no-console": "warn",
      "no-debugger": "warn",
      "arrow-parens": ["error", "always"],
      curly: ["error", "multi-line"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "any", prev: "directive", next: "directive" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "vue/multi-word-component-names": ["error", { ignores: ["index", "Component", "Page"] }],
      "vue/max-len": [
        "error",
        { code: 120, template: 960, ignoreComments: true, ignoreUrls: true },
      ],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/v-on-event-hyphenation": ["error", "never"],
      "vue/no-v-html": "off",
      "prettier/prettier": ["error", { printWidth: 100, tabWidth: 2 }],
    },
  },
];
