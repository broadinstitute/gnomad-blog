module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["src/**/*.js", "gatsby-browser.js"],
      env: {
        browser: true,
      },
    },
    {
      files: ["plugins/**/*.js", "gatsby-config.js", "gatsby-node.js"],
      env: {
        node: true,
      },
    },
  ],
};
