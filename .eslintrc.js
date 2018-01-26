module.exports = {
  extends: "@atomix/eslint-config",
  rules: {
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true
    }],
    "spaced-comment": ["off", "always", { "block": { "balanced": true, "exceptions": [":"] } }],
  },
}
