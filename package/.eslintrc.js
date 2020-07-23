module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [
          ".js",
          ".ts",
        ],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "no-multiple-empty-lines": [2, { max: 1 }],
    "import/extensions": 0,
  },
};
