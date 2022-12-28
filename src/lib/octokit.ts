import { Octokit } from '@octokit/rest';

const _octokit = global as typeof global & { octokit?: Octokit };

export const octokit =
  _octokit.octokit || new Octokit({ auth: import.meta.env.GITHUB_TOKEN });

if (import.meta.env.NODE_ENV !== 'production') _octokit.octokit = octokit;
