module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true
  },
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "implicit-arrow-linebreak": "off",
    "arrow-parens": "off",
    "react/jsx-filename-extension": "off",

    indent: "off",
    "@typescript-eslint/indent": ["error", 2]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
