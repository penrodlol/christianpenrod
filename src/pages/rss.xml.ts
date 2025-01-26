import { getSortedPosts } from '@/content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) =>
  rss({
    title: 'Christian Penrod | Blog',
    trailingSlash: false,
    description: 'A blog tailoring to Web Development.',
    site: String(context.site),
    items: (await getSortedPosts()).map((post) => ({
      link: `blog/${post.id}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
    })),
  });
