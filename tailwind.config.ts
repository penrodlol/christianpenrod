import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      backgroundColor: { 1: 'hsl(var(--bg-1))', 2: 'hsl(var(--bg-2))', 3: 'hsl(var(--bg-3))' },
      textColor: { 1: 'hsl(var(--text-1))', 2: 'hsl(var(--text-2))' },
      colors: { brand: 'hsl(var(--brand))' },
      borderColor: { DEFAULT: 'hsl(var(--border))' },
      ringColor: { DEFAULT: 'hsl(var(--ring))' },
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  corePlugins: { fontSize: false },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-fluid-type'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--bg-1': '0 0% 0%',
          '--bg-2': '0 0% 9%',
          '--bg-3': '0 0% 18%',
          '--text-1': '0 0% 74%',
          '--text-2': '0 0% 57%',
          '--brand': '0 0% 100%',
          '--border': '0 0% 18%',
          '--ring': '0 0% 70%',

          '--shiki-font-size': '0.85rem',
          '--shiki-color-text': 'hsl(0 23% 91%)',
          '--shiki-color-background': 'hsl(0 0% 0%)',
          '--shiki-token-constant': 'hsl(0 0% 59%)',
          '--shiki-token-string': 'hsl(0 0% 70%)',
          '--shiki-token-comment': 'hsl(0 0% 31%)',
          '--shiki-token-keyword': 'hsl(0 0% 59%)',
          '--shiki-token-parameter': 'hsl(0 0% 100%)',
          '--shiki-token-function': 'hsl(0 0% 100%)',
          '--shiki-token-string-expression': 'hsl(0, 0%, 70%)',
          '--shiki-token-punctuation': 'hsl(0 0% 100%)',

          '--scrollbar-thumb': 'hsl(var(--bg-3))',
          '--scrollbar-thumb-radius': '0.25rem',
          '--scrollbar-track-radius': '0.25rem',
          '--scrollbar-track': 'transparent',
        },
      });
    }),
  ],
} satisfies Config;
