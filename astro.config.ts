import alpine from '@astrojs/alpinejs';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, envField } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import prettyCode from 'rehype-pretty-code';
import { createCssVariablesTheme } from 'shiki';
import pagefind from './pagefind.config';

export default defineConfig({
  site: 'https://christianpenrod.com',
  trailingSlash: 'never',
  output: 'hybrid',
  adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [prettyCode, { theme: createCssVariablesTheme({ name: 'css-variables', variablePrefix: '--color-code-' }) }],
      () => (tree, vfile) => {
        const data = vfile.data as { astro: { frontmatter: Record<string, unknown> } };
        const payload = Math.round(readingTime(toString(tree)).minutes);
        data.astro.frontmatter.readingTime = `${payload} Min Read`;
      },
    ],
  },
  experimental: {
    serverIslands: true,
    contentLayer: true,
    env: {
      schema: {
        LOCATION: envField.string({ context: 'server', access: 'public' }),
        EMAIL: envField.string({ context: 'server', access: 'public' }),
        USERNAME: envField.string({ context: 'server', access: 'public' }),
        GITHUB: envField.string({ context: 'server', access: 'public', url: true }),
        TWITTER: envField.string({ context: 'server', access: 'public', url: true }),
        LINKEDIN: envField.string({ context: 'server', access: 'public', url: true }),
        JOB_LINK: envField.string({ context: 'server', access: 'public', url: true }),
        JOB_NAME: envField.string({ context: 'server', access: 'public' }),
        COLLEGE_LINK: envField.string({ context: 'server', access: 'public', url: true }),
        COLLEGE_NAME: envField.string({ context: 'server', access: 'public' }),
        GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret' }),
        PAGEFIND_LINK: envField.string({ context: 'server', access: 'public', url: true }),
      },
    },
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
