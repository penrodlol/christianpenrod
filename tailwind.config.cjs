/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'system-ui'] },
      textColor: { 1: '#fafafa', 2: '#b5b4b4' },
      backgroundColor: { 1: '#111', 2: '#222' },
      colors: { brand: '#999eb2' },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      boxShadow: {
        DEFAULT:
          '0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [
    require('tailwindcss-fluid-type'),
    ({ theme, addBase }) =>
      addBase({
        // https://github.com/tobiastimm/raiju/blob/master/themes/raiju-dark-noitalic.json
        ':root': {
          '--astro-code-color-text': theme('textColor.2'),
          '--astro-code-color-background': '#040404',
          '--astro-code-token-constant': '#cbb1f3',
          '--astro-code-token-string': '#ceb3f7',
          '--astro-code-token-comment': theme('textColor.2'),
          '--astro-code-token-keyword': '#8d9ad1',
          '--astro-code-token-parameter': '#d7e2ff',
          '--astro-code-token-function': '#d7e2ff',
          '--astro-code-token-string-expression': '#a5a5e1',
          '--astro-code-token-punctuation': '#8892aa',
        },
        '*': {
          scrollbarColor: `${theme('backgroundColor.2')} transparent`,
          scrollbarWidth: 'thin',
          '::-webkit-scrollbar': {
            width: `${theme('spacing.2')}`,
            height: `${theme('spacing.2')}`,
            '&-thumb': { backgroundColor: theme('backgroundColor.2') },
          },
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.brand.2')}`,
            outlineWidth: theme('outlineWidth.2'),
            outlineOffset: theme('outlineOffset.4'),
            borderRadius: theme('borderRadius.md'),
          },
        },
      }),
  ],
  future: { hoverOnlyWhenSupported: true },
};
