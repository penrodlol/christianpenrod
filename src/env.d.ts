/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EMAIL: string;
  readonly JOB: string;
  readonly COLLEGE: string;
  readonly GITHUB_PROFILE: string;
  readonly GITHUB_TOKEN: string;
  readonly GITHUB_USERNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
