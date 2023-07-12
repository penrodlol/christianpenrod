module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  proseWrap: 'always',
  printWidth: 100,
  plugins: [
    require('prettier-plugin-astro'),
    require('prettier-plugin-tailwindcss'),
  ],
};
