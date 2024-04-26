import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        xxl: 'var(--font-size-xxl)',
        xxxl: 'var(--font-size-xxxl)',
      },
      colors: {
        'surface-1': 'oklch(var(--surface-1)/<alpha-value>)',
        'surface-2': 'oklch(var(--surface-2)/<alpha-value>)',
        'surface-3': 'oklch(var(--surface-3)/<alpha-value>)',
        'foreground-1': 'oklch(var(--foreground-1)/<alpha-value>)',
        'foreground-2': 'oklch(var(--foreground-2)/<alpha-value>)',
        emphasis: 'oklch(var(--emphasis)/<alpha-value>)',
      },
      borderColor: { DEFAULT: 'oklch(var(--border)/<alpha-value>)' },
      ringColor: { DEFAULT: 'oklch(var(--ring)/<alpha-value>)' },
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--font-size-xs': 'clamp(0.64rem, -0.09vw + 0.82rem, 0.64rem)',
          '--font-size-sm': 'clamp(0.8rem, -0.09vw + 0.82rem, 0.75rem)',
          '--font-size-base': 'clamp(1rem, 0vw + 1rem, 1rem)',
          '--font-size-md': 'clamp(1.25rem, 0.15vw + 1.21rem, 1.33rem)',
          '--font-size-lg': 'clamp(1.56rem, 0.39vw + 1.47rem, 1.78rem)',
          '--font-size-xl': 'clamp(1.95rem, 0.76vw + 1.76rem, 2.37rem)',
          '--font-size-xxl': 'clamp(2.44rem, 1.3vw + 2.12rem, 3.16rem)',
          '--font-size-xxxl': 'clamp(3.05rem, 2.1vw + 2.53rem, 4.21rem)',

          '--surface-1': '10% 0 0',
          '--surface-2': '20% 0 0',
          '--surface-3': '30% 0 0',
          '--foreground-1': '80% 0 0',
          '--foreground-2': '66% 0 0',
          '--emphasis': '100% 0 0',
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
