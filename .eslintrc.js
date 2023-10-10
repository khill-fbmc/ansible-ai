const path = require("node:path");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    project: ["tsconfig.json", "tsconfig.eslint.json"].map(x => path.join(__dirname, x)),
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: true,
      node: true,
      alias: {
        extensions: [".ts", ".tsx"],
        map: [["@", path.join(__dirname, ".")]],
      },
    },
    "import/extensions": [".ts", ".tsx"],
  },
  plugins: ["react", "import", "prettier", "simple-import-sort", "@typescript-eslint/eslint-plugin"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/first": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\u0000"], ["^node:"], ["^@?\\w"], ["^"], ["^\\."], ["^.+\\u0000$"]],
      },
    ],
  },
  overrides: [
    {
      env: {
        node: true,
        commonjs: true,
      },
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
