import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const get: APIRoute = async () => {
  const posts = await getCollection('posts');

  return rss({
    title: "Christian Penrod's Blog",
    description: 'A blog tailoring to Web Development.',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `blog/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.published,
    })),
  });
};
