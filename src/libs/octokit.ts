import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from 'astro:env/server';

const _global = global as typeof global & { octokit?: Octokit };
const _octokit = _global.octokit || new Octokit({ auth: GITHUB_TOKEN });

if (process.env.NODE_ENV !== 'development') _global.octokit = _octokit;

export default _octokit;
