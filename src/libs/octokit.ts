import { Octokit } from '@octokit/rest';

export default new Octokit({ auth: import.meta.env.GITHUB_TOKEN });
