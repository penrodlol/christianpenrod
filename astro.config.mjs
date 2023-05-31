import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, sharpImageService } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingtime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  site: 'https://christianpenrod.com',
  image: { service: sharpImageService() },
  experimental: { assets: true },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'css-variables',
          onVisitHighlightedLine: (node) =>
            node.properties.className.push('visited'),
        },
      ],
      () => (tree, vfile) => {
        const payload = Math.round(readingtime(toString(tree)).minutes);
        vfile.data.astro.frontmatter.readingTime = payload;
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
      policy: [{ userAgent: '*', disallow: ['/404'] }],
    }),
  ],
});
