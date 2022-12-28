/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EMAIL: string;
  readonly JOB: string;
  readonly COLLEGE: string;
  readonly GITHUB_PROFILE: string;
  readonly GITHUB_TOKEN: string;
  readonly GITHUB_USERNAME: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
