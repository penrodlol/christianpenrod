import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      backgroundColor: {
        1: 'oklch(var(--bg-1)/<alpha-value>)',
        2: 'oklch(var(--bg-2)/<alpha-value>)',
        3: 'oklch(var(--bg-3)/<alpha-value>)',
      },
      textColor: { 1: 'oklch(var(--text-1)/<alpha-value>)', 2: 'oklch(var(--text-2)/<alpha-value>)' },
      colors: { brand: 'oklch(var(--brand)/<alpha-value>)' },
      borderColor: { DEFAULT: 'oklch(var(--border)/<alpha-value>)' },
      ringColor: { DEFAULT: 'oklch(var(--ring)/<alpha-value>)' },
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
          '--bg-1': '10% 0 0',
          '--bg-2': '20% 0 0',
          '--bg-3': '30% 0 0',
          '--text-1': '80% 0 0',
          '--text-2': '66% 0 0',
          '--brand': '100% 0 0',
          '--border': '30% 0 0',
          '--ring': '40% 0 0',

          '--shiki-color-text': 'oklch(92% 0.012 276.09)',
          '--shiki-color-background': 'oklch(0% 0 0)',
          '--shiki-token-constant': 'oklch(67.31% 0 0)',
          '--shiki-token-string': 'oklch(76.68% 0 0)',
          '--shiki-token-comment': 'oklch(42.39% 0 0)',
          '--shiki-token-keyword': 'oklch(67.31% 0 0)',
          '--shiki-token-parameter': 'oklch(100% 0 0)',
          '--shiki-token-function': 'oklch(100% 0 0)',
          '--shiki-token-string-expression': 'oklch(76.68% 0 0)',
          '--shiki-token-punctuation': 'oklch(100% 0 0)',
        },
      });
    }),
  ],
} satisfies Config;
