/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    "@typescript-eslint/no-unused-vars": 1
  }
}