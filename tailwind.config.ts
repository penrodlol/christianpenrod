import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { mono: ['Monaspace Neon', ...theme.fontFamily.sans] },
      colors: {
        gray: {
          '1': 'oklch(var(--gray-1) / <alpha-value>)',
          '2': 'oklch(var(--gray-2) / <alpha-value>)',
          '3': 'oklch(var(--gray-3) / <alpha-value>)',
          '4': 'oklch(var(--gray-4) / <alpha-value>)',
          '5': 'oklch(var(--gray-5) / <alpha-value>)',
          '6': 'oklch(var(--gray-6) / <alpha-value>)',
          '7': 'oklch(var(--gray-7) / <alpha-value>)',
          '8': 'oklch(var(--gray-8) / <alpha-value>)',
          '9': 'oklch(var(--gray-9) / <alpha-value>)',
          '10': 'oklch(var(--gray-10) / <alpha-value>)',
          '11': 'oklch(var(--gray-11) / <alpha-value>)',
          '12': 'oklch(var(--gray-12) / <alpha-value>)',
          contrast: 'oklch(var(--gray-contrast) / <alpha-value>)',
        },
        accent: {
          '1': 'oklch(var(--accent-1) / <alpha-value>)',
          '2': 'oklch(var(--accent-2) / <alpha-value>)',
          '3': 'oklch(var(--accent-3) / <alpha-value>)',
          '4': 'oklch(var(--accent-4) / <alpha-value>)',
          '5': 'oklch(var(--accent-5) / <alpha-value>)',
          '6': 'oklch(var(--accent-6) / <alpha-value>)',
          '7': 'oklch(var(--accent-7) / <alpha-value>)',
          '8': 'oklch(var(--accent-8) / <alpha-value>)',
          '9': 'oklch(var(--accent-9) / <alpha-value>)',
          '10': 'oklch(var(--accent-10) / <alpha-value>)',
          '11': 'oklch(var(--accent-11) / <alpha-value>)',
          '12': 'oklch(var(--accent-12) / <alpha-value>)',
          contrast: 'oklch(var(--accent-contrast) / <alpha-value>)',
        },
      },
      borderColor: { DEFAULT: 'oklch(var(--gray-6) / <alpha-value>)' },
      borderRadius: { DEFAULT: 'var(--radius)' },
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
          '--scrollbar-thumb': 'oklch(53.3% 0 none)',
          '--scrollbar-thumb-radius': '0.25rem',
          '--scrollbar-track-radius': '0.25rem',
          '--scrollbar-track': 'transparent',

          '--radius': '0.25rem',

          '--gray-1': '0% 0 none',
          '--gray-2': '18.1% 0 none',
          '--gray-3': '23.7% 0 none',
          '--gray-4': '27.3% 0 none',
          '--gray-5': '30.6% 0 none',
          '--gray-6': '34.5% 0 none',
          '--gray-7': '39.8% 0 none',
          '--gray-8': '48.8% 0 none',
          '--gray-9': '53.3% 0 none',
          '--gray-10': '57.9% 0 none',
          '--gray-11': '76.6% 0 none',
          '--gray-12': '94.7% 0 none',
          '--gray-contrast': '100% 0 none',

          '--accent-1': '0% 0 none',
          '--accent-2': '18.4% 0 none',
          '--accent-3': '23.9% 0 none',
          '--accent-4': '27.6% 0 none',
          '--accent-5': '30.9% 0 none',
          '--accent-6': '34.7% 0 none',
          '--accent-7': '40.1% 0 none',
          '--accent-8': '48.7% 0 none',
          '--accent-9': '95.5% 0 none',
          '--accent-10': '92.7% 0 none',
          '--accent-11': '77% 0 none',
          '--accent-12': '94.9% 0 none',
          '--accent-contrast': '24.9% 0 none',
        },
      });
    }),
  ],
} satisfies Config;
