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
      boxShadow: { DEFAULT: 'var(--shadow)' },
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
          '--scrollbar-thumb': 'hsl(var(--bg-3))',
          '--scrollbar-thumb-radius': '0.25rem',
          '--scrollbar-track-radius': '0.25rem',
          '--scrollbar-track': 'transparent',

          '--shiki-font-size': '0.85rem',
        },
        html: {
          '--bg-1': '0 0% 95%',
          '--bg-2': '0 0% 90%',
          '--bg-3': '0 0% 82%',
          '--text-1': '0 0% 12%',
          '--text-2': '0 0% 34%',
          '--brand': '0 0% 0%',
          '--border': '0 0% 64%',
          '--ring': '0 0% 10%',
          '--shadow':
            '0.3px 0.5px 0.7px hsl(0 0% 70%/0.45),0.9px 1.8px 2.3px -0.8px hsl(0 0% 70%/0.45),' +
            '2.3px 4.6px 5.8px -1.7px hsl(0 0% 70%/0.45),5.6px 11.3px 14.2px -2.5px hsl(0 0% 70%/0.45)',

          '--shiki-color-text': 'hsl(0 23% 9%)',
          '--shiki-color-background': 'hsl(0 0% 100%)',
          '--shiki-token-constant': 'hsl(0 0% 41%)',
          '--shiki-token-string': 'hsl(0 0% 30%)',
          '--shiki-token-comment': 'hsl(0 0% 69%)',
          '--shiki-token-keyword': 'hsl(0 0% 41%)',
          '--shiki-token-parameter': 'hsl(0 0% 0%)',
          '--shiki-token-function': 'hsl(0 0% 0%)',
          '--shiki-token-string-expression': 'hsl(0, 0%, 30%)',
          '--shiki-token-punctuation': 'hsl(0 0% 0%)',
        },
        'html.dark': {
          '--bg-1': '0 0% 3%',
          '--bg-2': '0 0% 10%',
          '--bg-3': '0 0% 20%',
          '--text-1': '0 0% 90%',
          '--text-2': '0 0% 66%',
          '--brand': '0 0% 100%',
          '--border': '0 0% 24%',
          '--ring': '0 0% 70%',
          '--shadow':
            '0.3px 0.5px 0.7px hsl(0 0% 0%/ 0.45),0.9px 1.8px 2.3px -0.8px hsl(0 0% 0%/ 0.45),' +
            '2.3px 4.6px 5.8px -1.7px hsl(0 0% 0%/ 0.45),5.6px 11.3px 14.2px -2.5px hsl(0 0% 0%/ 0.45)',

          '--shiki-color-text': 'hsl(0 23% 91%)',
          '--shiki-color-background': 'hsl(0 0% 2%)',
          '--shiki-token-constant': 'hsl(0 0% 59%)',
          '--shiki-token-string': 'hsl(0 0% 70%)',
          '--shiki-token-comment': 'hsl(0 0% 50%)',
          '--shiki-token-keyword': 'hsl(0 0% 59%)',
          '--shiki-token-parameter': 'hsl(0 0% 100%)',
          '--shiki-token-function': 'hsl(0 0% 100%)',
          '--shiki-token-string-expression': 'hsl(0, 0%, 70%)',
          '--shiki-token-punctuation': 'hsl(0 0% 100%)',
        },
      });
    }),
  ],
} satisfies Config;
