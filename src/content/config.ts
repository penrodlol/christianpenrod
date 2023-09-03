import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.date(),
      repo: z.string().optional(),
      cover: image(),
    }),
});

const roles = defineCollection({
  schema: z.object({
    company: z.string(),
    link: z.string().url(),
    start: z.date(),
    end: z.date().optional(),
  }),
});

export const collections = { posts, roles };
