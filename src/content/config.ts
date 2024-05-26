import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.date(),
      topics: z.array(z.string()),
      repo: z.string().optional(),
    }),
});

export const collections = { posts };
