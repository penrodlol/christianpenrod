import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingtime from 'reading-time';

export default defineConfig({
  site: 'https://christianpenrod.com',
  markdown: {
    extendDefaultPlugins: true,
    shikiConfig: { theme: 'css-variables' },
    rehypePlugins: [
      () =>
        (tree, { data }) => {
          const payload = Math.round(readingtime(toString(tree)).minutes);
          data.astro.frontmatter.readingTime = payload;
        },
    ],
  },
  integrations: [
    tailwind(),
    mdx(),
    preact(),
    image({ serviceEntryPoint: '@astrojs/image/sharp' }),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({
      host: true,
      policy: [{ userAgent: '*', disallow: ['/api', '/404'] }],
    }),
  ],
  experimental: { contentCollections: true },
});
