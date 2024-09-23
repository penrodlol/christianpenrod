import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) =>
  rss({
    title: 'Blog | Christian Penrod',
    trailingSlash: false,
    description: 'A blog tailoring to Web Development.',
    site: String(context.site),
    items: (await getCollection('posts')).map((post) => ({
      link: `blog/${post.id}`,
      title: post.data.title,
      pubDate: post.data.published,
    })),
  });
