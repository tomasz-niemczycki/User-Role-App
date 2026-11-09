import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    files: ["**/*.ts"],

    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },

    rules: {
      // =================================
      // BEZPIECZEŃSTWO TYPESCRIPT
      // =================================

      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/no-non-null-assertion": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      "@typescript-eslint/explicit-module-boundary-types": "error",

      // =================================
      // ZMIENNE I IMPORTY
      // =================================

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
          ignoreRestSiblings: true,
        },
      ],

      // =================================
      // CZYTELNOŚĆ KODU
      // =================================

      eqeqeq: ["error", "always"],

      curly: ["error", "all"],

      "no-var": "error",

      "prefer-const": "error",

      "no-else-return": "error",

      "object-shorthand": "error",

      "prefer-template": "error",

      // =================================
      // BEZPIECZNE OPERACJE
      // =================================

      "@typescript-eslint/no-floating-promises": "error",

      "@typescript-eslint/no-misused-promises": "error",

      "@typescript-eslint/await-thenable": "error",

      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
        },
      ],

      // =================================
      // DODATKOWE
      // =================================

      "no-console": "off",

      "no-debugger": "error",

      complexity: ["warn", { max: 2 }],

      // Trailing spaces
      "no-trailing-spaces": [
        "error",
        { skipBlankLines: false, ignoreComments: false },
      ],

      // =====================
      // SECURITY RULES
      // =====================
      // Prevent code injection attacks (XSS, eval-based attacks)
      "no-eval": "warn", // Disallow eval() - major security risk
      "no-new-func": "error", // Disallow new Function() - similar to eval
      "no-script-url": "error", // Disallow javascript: URLs
      "no-implied-eval": "error", // Disallow implied eval through setTimeout/setInterval with strings

      // Prevent prototype pollution
      "no-prototype-builtins": "error",
      "no-extend-native": "error",
      "no-iterator": "error",
      "no-proto": "error",

      // =====================
      // BEST PRACTICES
      // =====================
      "no-throw-literal": "warn",
      "no-self-compare": "error",
      "no-template-curly-in-string": "warn",
      "no-unmodified-loop-condition": "warn",
      "no-unreachable-loop": "error",

      // Array and object safety
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "error",
      "no-object-constructor": "warn",

      // Async/Promise safety
      "require-atomic-updates": "warn",
      "no-async-promise-executor": "error",

      // Angular rules
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "naxiom", "nax"],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/no-output-native": "warn",
      "@angular-eslint/contextual-decorator": "error",
      "@angular-eslint/no-empty-lifecycle-method": "warn",
      "@angular-eslint/no-input-rename": "warn",
      "@angular-eslint/no-output-rename": "warn",
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/no-pipe-impure": "warn",
      "@angular-eslint/prefer-standalone": "off",
      "@angular-eslint/sort-lifecycle-methods": "warn",

      "no-useless-escape": "warn",
      "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
      // TypeScript specific rules
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/member-ordering": [
        "warn",
        {
          default: [
            "public-decorated-field",
            "public-field",
            "protected-field",
            "private-field",
            "constructor",
            "public-method",
            "protected-method",
            "private-method",
          ],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "classProperty",
          leadingUnderscore: "require",
          modifiers: ["private"],
          format: ["camelCase"],
        },
        {
          selector: ["variable", "function", "classMethod"],
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["class"],
          format: ["PascalCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "variable",
          modifiers: ["global", "const"],
          format: ["UPPER_CASE", "camelCase"],
        },
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: "typeParameter",
          format: ["PascalCase"],
          prefix: ["T"],
        },
      ],
      "@typescript-eslint/no-empty-function": "warn",

      // Complexity rules // Maximum cyclomatic complexity
      "max-lines-per-function": [
        "off",
        { max: 100, skipBlankLines: true, skipComments: true },
      ], // Maximum lines per function
      "max-depth": ["off", 4], // Maximum nesting depth
      "max-params": ["off", 5], // Maximum number of parameters
      "max-statements": ["off", 20], // Maximum number of statements in a function

      // General rules
      "linebreak-style": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "max-len": "off",
      "no-empty-function": "off",
      "prefer-spread": "off",

      // RxJS rules
      "rxjs-x/no-nested-subscribe": "warn",

      // Import ordering
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          ignoreCase: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "no-set-interval/no-set-interval": "error",
      "no-set-timeout/no-set-timeout": "error",
    },
  },
]);
