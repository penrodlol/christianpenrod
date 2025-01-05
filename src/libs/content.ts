import { z } from 'astro/zod';
import { getCollection, render } from 'astro:content';

export type GetSortedPosts = Awaited<ReturnType<typeof getSortedPosts>>;
export type GetAllTopics = Awaited<ReturnType<typeof getAllTopics>>;

export const POSTS_PAGE_SIZE = 14;

export const getSortedPosts = async () =>
  await Promise.all(
    (await getCollection('posts'))
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map(async (post) => {
        const { remarkPluginFrontmatter, ...renderedData } = await render(post);
        const remarkData = z.object({ readingTime: z.string() }).parse(remarkPluginFrontmatter);
        const topics = post.data.topics.map((topic) => ({ id: topic.toLowerCase().replace(/\s/g, '-'), text: topic }));
        return { ...post, data: { ...post.data, ...remarkData, topics }, ...renderedData };
      }),
  );

export const getAllTopics = async () =>
  [...new Set((await getCollection('posts')).flatMap((post) => post.data.topics))].sort().map((topic) => ({
    id: topic.toLowerCase().replace(/\s/g, '-'),
    text: topic,
  }));
