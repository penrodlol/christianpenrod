import { Octokit } from '@octokit/rest';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { GITHUB_TOKEN, USERNAME } from 'astro:env/server';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content' }),
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
    loader: async () =>
      Promise.all(
        ['feedjoy', 'christianpenrod'].map((repo) =>
          octokit.repos.get({ owner: USERNAME, repo }).then((response) => ({
            id: response.data.id.toString(),
            name: response.data.name,
            description: response.data.description,
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            watchers: response.data.watchers_count,
            topics: response.data.topics,
            githubUrl: response.data.html_url,
            websiteUrl: response.data.homepage,
          })),
        ),
      ),
    schema: () =>
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        stars: z.number(),
        forks: z.number(),
        watchers: z.number(),
        topics: z.array(z.string()),
        githubUrl: z.string().url(),
        websiteUrl: z.string().url(),
      }),
  }),
};
