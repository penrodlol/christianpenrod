import octokit from '@/libs/octokit';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { USERNAME } from 'astro:env/server';

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/data/posts/' }),
    schema: () =>
      z.object({
        title: z.string(),
        description: z.string(),
        published: z.coerce.date(),
        topics: z.array(z.string()),
        repo: z
          .string()
          .optional()
          .transform(async (repo) => {
            if (!repo) return null;
            return octokit.repos.get({ owner: USERNAME, repo }).then((response) => ({
              name: response.data.name,
              description: response.data.description,
              language: response.data.language,
              stargazers: response.data.stargazers_count,
              forks: response.data.forks_count,
              watchers: response.data.watchers_count,
              githubUrl: response.data.homepage,
              websiteUrl: response.data.html_url,
            }));
          }),
      }),
  }),
  projects: defineCollection({
    schema: () =>
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        stars: z.number(),
        forks: z.number(),
        watchers: z.number(),
        githubUrl: z.string(),
        websiteUrl: z.string(),
      }),
    loader: async () =>
      Promise.all(
        ['feedjoy', 'christianpenrod'].map(async (repo) =>
          octokit.repos.get({ owner: USERNAME, repo }).then((response) => ({
            id: response.data.id.toString(),
            name: response.data.name,
            description: response.data.description,
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            watchers: response.data.watchers_count,
            githubUrl: response.data.html_url,
            websiteUrl: response.data.homepage,
          })),
        ),
      ),
  }),
};
