module.exports = {
  extends: "atomix-base",
  rules: {
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true
    }],
    "spaced-comment": ["off", "always", { "block": { "balanced": true, "exceptions": [":"] } }],
  },
}
