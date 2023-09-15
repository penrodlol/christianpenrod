import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      fontSize: { xxs: '12px' },
      backgroundColor: { 1: colors.black, 2: colors.neutral[950], 3: colors.neutral[900] },
      textColor: { 1: colors.neutral[400], 2: colors.neutral[500] },
      colors: { emphasis: colors.neutral[200] },
      borderColor: { DEFAULT: colors.neutral[800] },
      ringColor: { DEFAULT: colors.neutral[500] },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      backgroundImage: {
        noise:
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIj48ZGVmcz48ZmlsdGVyIGlkPSJhIiB4PSItMjAlIiB5PSItMjAlIiB3aWR0aD0iMTQwJSIgaGVpZ2h0PSIxNDAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHByaW1pdGl2ZVVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjEwMiIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMTUiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVzdWx0PSJ0dXJidWxlbmNlIi8+PGZlU3BlY3VsYXJMaWdodGluZyBzdXJmYWNlU2NhbGU9IjE1IiBzcGVjdWxhckNvbnN0YW50PSIuNzUiIHNwZWN1bGFyRXhwb25lbnQ9IjIwIiBsaWdodGluZy1jb2xvcj0iIzIyMiIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBpbj0idHVyYnVsZW5jZSIgcmVzdWx0PSJzcGVjdWxhckxpZ2h0aW5nIj48ZmVEaXN0YW50TGlnaHQgYXppbXV0aD0iMyIgZWxldmF0aW9uPSIxMDAiLz48L2ZlU3BlY3VsYXJMaWdodGluZz48L2ZpbHRlcj48L2RlZnM+PHBhdGggZmlsbD0idHJhbnNwYXJlbnQiIGQ9Ik0wIDBoNzAwdjcwMEgweiIvPjxwYXRoIGZpbGw9IiMyMjIiIGZpbHRlcj0idXJsKCNhKSIgZD0iTTAgMGg3MDB2NzAwSDB6Ii8+PC9zdmc+")',
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-fluid-type'),
    plugin(({ theme, addBase }) => {
      addBase({
        ':root': {
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
        '*': {
          scrollbarColor: `${theme('backgroundColor.3')} transparent`,
          scrollbarWidth: 'thin',
          '::-webkit-scrollbar': {
            width: `${theme('spacing.2')}`,
            height: `${theme('spacing.2')}`,
            '&-thumb': { backgroundColor: theme('backgroundColor.3') },
          },
        },
      });
    }),
  ],
} satisfies Config;
