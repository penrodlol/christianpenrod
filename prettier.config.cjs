/** @type {import("prettier").Options} */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  proseWrap: 'always',
  printWidth: 100,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
};
