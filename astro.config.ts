import alpine from '@astrojs/alpinejs';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import prettyCode from 'rehype-pretty-code';
import { createCssVariablesTheme } from 'shiki';

export default defineConfig({
  site: 'https://christianpenrod.com',
  trailingSlash: 'never',
  adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [prettyCode, { theme: createCssVariablesTheme({ name: 'css-variables', variablePrefix: '--code-' }) }],
      () => (tree, vfile) => {
        const data = vfile.data as { astro: { frontmatter: Record<string, unknown> } };
        const payload = Math.round(readingTime(toString(tree)).minutes);
        data.astro.frontmatter.readingTime = `${payload} Min Read`;
      },
    ],
  },
  env: {
    schema: {
      LOCATION: envField.string({ context: 'server', access: 'public' }),
      EMAIL: envField.string({ context: 'server', access: 'public' }),
      USERNAME: envField.string({ context: 'server', access: 'public' }),
      GITHUB: envField.string({ context: 'server', access: 'public', url: true }),
      TWITTER: envField.string({ context: 'server', access: 'public', url: true }),
      BLUESKY: envField.string({ context: 'server', access: 'public', url: true }),
      LINKEDIN: envField.string({ context: 'server', access: 'public', url: true }),
      JOB_LINK: envField.string({ context: 'server', access: 'public', url: true }),
      JOB_NAME: envField.string({ context: 'server', access: 'public' }),
      JOB_TITLE: envField.string({ context: 'server', access: 'public' }),
      COLLEGE_LINK: envField.string({ context: 'server', access: 'public', url: true }),
      COLLEGE_NAME: envField.string({ context: 'server', access: 'public' }),
      COLLEGE_TITLE: envField.string({ context: 'server', access: 'public' }),
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  experimental: {
    responsiveImages: true,
    fonts: [
      { name: 'Geist', type: 'sans', weights: '100 900' },
      { name: 'Geist Mono', type: 'mono', weights: '100 900' },
      { name: 'EB Garamond', type: 'serif', weights: '400 800' },
    ].map((font) => ({
      provider: fontProviders.fontsource(),
      name: font.name,
      cssVariable: `--font-${font.type}`,
      weights: [font.weights],
      subsets: ['latin'],
      styles: ['normal'],
    })),
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    mdx(),
    db(),
    icon(),
    pagefind(),
    alpine({ entrypoint: '/alpine.config.ts' }),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({ policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
});
