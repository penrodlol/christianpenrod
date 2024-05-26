import alpine from '@astrojs/alpinejs';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import { createCssVariablesTheme } from 'shiki';

export default defineConfig({
  site: 'https://christianpenrod.com',
  output: 'hybrid',
  adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypePrettyCode, { theme: createCssVariablesTheme({ name: 'css-variables' }) }],
      () => (tree, vfile) => {
        const data = vfile.data as { astro: { frontmatter: Record<string, unknown> } };
        const payload = Math.round(readingTime(toString(tree)).minutes);
        data.astro.frontmatter.readingTime = `${payload} Min Read`;
      },
    ],
  },
  integrations: [
    tailwind(),
    mdx(),
    db(),
    alpine({ entrypoint: '/alpine.config.ts' }),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({ host: true, policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
});
