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
  readonly PLANETSCALE_DB_HOST: string;
  readonly PLANETSCALE_DB_USERNAME: string;
  readonly PLANETSCALE_DB_PASSWORD: string;
  readonly PUBLIC_PAGEFIND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
