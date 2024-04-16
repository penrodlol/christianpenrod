import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');

  return rss({
    title: 'Blog | Christian Penrod',
    description: 'A blog tailoring to Web Development.',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `blog/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.published.date,
    })),
  });
};
