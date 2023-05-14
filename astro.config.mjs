import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, sharpImageService } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingtime from 'reading-time';

export default defineConfig({
  site: 'https://christianpenrod.com',
  image: { service: sharpImageService() },
  experimental: { assets: true },
  markdown: {
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
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({
      host: true,
      policy: [{ userAgent: '*', disallow: ['/api', '/404'] }],
    }),
  ],
});
