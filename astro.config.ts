import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, sharpImageService } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  site: 'https://christianpenrod.com',
  image: { service: sharpImageService() },
  adapter: vercel({ analytics: true }),
  experimental: { assets: true },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'css-variables' }],
      () => (tree, vfile) => {
        const data = vfile.data as { astro: { frontmatter: Record<string, unknown> } };
        const payload = Math.round(readingTime(toString(tree)).minutes);
        data.astro.frontmatter.readingTime = payload;
      },
    ],
  },
  integrations: [
    tailwind(),
    mdx(),
    preact(),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({ host: true, policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
});
