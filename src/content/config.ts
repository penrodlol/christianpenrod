import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: {
    title: z.string(),
    description: z.string(),
    published: z.date(),
    repo: z.string().optional(),
  },
});

const roles = defineCollection({
  schema: {
    company: z.string(),
    start: z.date(),
    end: z.date().optional(),
  },
});

export const collections = { posts, roles };
