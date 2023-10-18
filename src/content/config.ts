import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.date(),
      topics: z.array(z.string()),
      repo: z.string().optional(),
      cover: image(),
    }),
});

export const collections = { posts };
