/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-search-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly USERNAME: string;
  readonly LOCATION: string;
  readonly JOB_NAME: string;
  readonly JOB_LINK: string;
  readonly COLLEGE_NAME: string;
  readonly COLLEGE_LINK: string;
  readonly GITHUB: string;
  readonly TWITTER: string;
  readonly LINKEDIN: string;
  readonly EMAIL: string;
  readonly PUBLIC_PAGEFIND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}
