import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.date().transform((date) => ({
        date,
        iso: date.toISOString(),
        pretty: date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'UTC',
        }),
      })),
      topics: z.array(z.string()),
      repo: z.string().optional(),
      cover: image(),
    }),
});

export const collections = { posts };
