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

          '--shiki-color-text': '#e2e4ed',
          '--shiki-color-background': '#000000',
          '--shiki-token-constant': '#969696',
          '--shiki-token-string': '#b3b3b3',
          '--shiki-token-comment': '#4e4e4e',
          '--shiki-token-keyword': '#969696',
          '--shiki-token-parameter': '#ffffff',
          '--shiki-token-function': '#ffffff',
          '--shiki-token-string-expression': '#b3b3b3',
          '--shiki-token-punctuation': '#ffffff',
        },
      });
    }),
  ],
} satisfies Config;
