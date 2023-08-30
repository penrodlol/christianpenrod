/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly USERNAME: string;
  readonly JOB: string;
  readonly COLLEGE: string;
  readonly GITHUB: string;
  readonly TWITTER: string;
  readonly LINKEDIN: string;
  readonly EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
