/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EMAIL: string;
  readonly JOB: string;
  readonly COLLEGE: string;
  readonly USERNAME: string;
  readonly GITHUB_PROFILE: string;
  readonly GITHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
