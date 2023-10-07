import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';

export default defineConfig({
  site: 'https://christianpenrod.com',
  output: 'hybrid',
  adapter: vercel({ webAnalytics: { enabled: true } }),
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'css-variables' }],
      () => (tree, vfile) => {
        const data = vfile.data as { astro: { frontmatter: Record<string, unknown> } };
        const payload = Math.round(readingTime(toString(tree)).minutes);
        data.astro.frontmatter.readingTime = payload;

        visit(tree, 'element', (node) => {
          if (node.properties?.['data-rehype-pretty-code-fragment'] !== '') return;
          node.tagName = 'figure';
          visit(node, 'element', (child) => {
            if (child.properties?.['data-rehype-pretty-code-title'] === '')
              child.properties.slot = 'title';
          });
        });
      },
    ],
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({ host: true, policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
  vite: {
    build: { rollupOptions: { external: ['.vercel/output/static/blog/pagefind/pagefind'] } },
  },
});
