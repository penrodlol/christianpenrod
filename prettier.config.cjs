/** @type {import("prettier").Options} */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  proseWrap: 'always',
  printWidth: 100,
  tailwindFunctions: ['twMerge', 'twJoin'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
};
