import { z } from 'astro/zod';
import { getCollection, render } from 'astro:content';

export type GetSortedPosts = Awaited<ReturnType<typeof getSortedPosts>>;
export type GetAllTopics = Awaited<ReturnType<typeof getAllTopics>>;

export const getSortedPosts = async () =>
  await Promise.all(
    (await getCollection('posts'))
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map(async (post) => {
        const { remarkPluginFrontmatter, ...renderedData } = await render(post);
        const data = z.object({ readingTime: z.string() }).parse(remarkPluginFrontmatter);
        return { ...post, data: { ...post.data, ...data }, ...renderedData };
      }),
  );

export const getAllTopics = async () =>
  [...new Set((await getCollection('posts')).flatMap((post) => post.data.topics))].sort().map((topic) => ({
    id: topic.toLowerCase().replace(/\s/g, '-'),
    value: topic,
  }));
