module.exports = {
  extends: "atomix-base",
  rules: {
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true
    }],
    "spaced-comment": ["error", "always", { "balanced": true }],
  },
}
