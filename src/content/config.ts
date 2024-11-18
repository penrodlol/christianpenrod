import { Octokit } from '@octokit/rest';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { GITHUB_TOKEN, USERNAME } from 'astro:env/server';

const github = new Octokit({ auth: GITHUB_TOKEN });

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
            return github.repos.get({ owner: USERNAME, repo }).then((response) => ({
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
  stats: defineCollection({
    loader: async () => {
      const from = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString();
      const query = `{user(login:"${USERNAME}"){contributions:contributionsCollection(from:"${from}")
        {commits:totalCommitContributions},pullRequests{total:totalCount},followers{total:totalCount},
        stars:repositories(ownerAffiliations:OWNER,last:100,orderBy:{direction:DESC,field:STARGAZERS}){
        total:nodes{stars:stargazers{total:totalCount}}}}}`;
      return github
        .graphql<any>(query)
        .then(({ user: { contributions, pullRequests, followers, stars } }) => ({
          commits: { label: 'Commits', icon: 'workflow', value: contributions.commits },
          followers: { label: 'Followers', icon: 'users', value: followers.total },
          stars: { label: 'Stars', icon: 'star', value: stars.total.reduce((a: any, r: any) => a + r.stars.total, 0) },
          pullRequests: { label: 'PRs', icon: 'git-pull-request', value: pullRequests.total },
        }))
        .then((data) => Object.entries(data).map(([id, props]) => ({ id, ...props })));
    },
    schema: z.object({ id: z.string(), label: z.string(), value: z.number(), icon: z.string() }),
  }),
  languages: defineCollection({
    loader: async () => {
      const query = `{user(login:"${USERNAME}"){repositories(ownerAffiliations:OWNER,last:100,orderBy:
        {field:UPDATED_AT,direction:DESC}){nodes{languages(first:8){nodes{name}}}}}}`;
      return github.graphql<any>(query).then((response) => {
        const languages = response.user.repositories.nodes
          .flatMap((node: any) => node.languages.nodes)
          .reduce((a: any, r: any) => ({ ...a, [r.name]: (a[r.name] || 0) + 1 }), {});
        return Object.entries(languages)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 12)
          .map(([name, count]) => ({ id: crypto.randomUUID(), name, count }));
      });
    },
    schema: z.object({ id: z.string(), name: z.string(), count: z.number() }),
  }),
  topics: defineCollection({
    loader: async () => {
      const query = `{user(login:"${USERNAME}"){repositories(ownerAffiliations:OWNER,last:100,orderBy:
        {field:UPDATED_AT,direction:DESC}){nodes{repositoryTopics(first:5){edges{node{topic{name}}}}}}}}`;
      return github.graphql<any>(query).then((response) => {
        const allTags = response.user.repositories.nodes
          .flatMap((node: any) => node.repositoryTopics.edges.map((edge: any) => edge.node.topic.name))
          .reduce((a: any, r: any) => ({ ...a, [r]: (a[r] || 0) + 1 }), {});
        return Object.entries(allTags)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 12)
          .map(([name, count]) => ({ id: crypto.randomUUID(), name, count }));
      });
    },
    schema: z.object({ id: z.string(), name: z.string(), count: z.number() }),
  }),
};
