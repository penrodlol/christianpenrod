import { Octokit } from '@octokit/rest';

const _global = global as typeof global & { octokit?: Octokit };
const _octokit = _global.octokit || new Octokit({ auth: import.meta.env.GITHUB_TOKEN });

if (process.env.NODE_ENV !== 'development') _global.octokit = _octokit;

export default _octokit;
