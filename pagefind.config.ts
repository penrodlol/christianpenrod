import type { AstroIntegration } from 'astro';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createIndex } from 'pagefind';
import sirv from 'sirv';

const DEFAULT_DIRECTORY = fileURLToPath(new URL('dist', import.meta.url));
const VERCEL_DIRECTORY = fileURLToPath(new URL('.vercel/output/static', import.meta.url));

export default (): AstroIntegration => ({
  name: 'pagefind',
  hooks: {
    'astro:server:setup': ({ server }) => {
      const serve = sirv(DEFAULT_DIRECTORY, { dev: true, etag: true });
      server.middlewares.use((req, res, next) => (req.url?.includes('pagefind') ? serve(req, res, next) : next()));
    },
    'astro:build:done': async () => {
      const { index } = await createIndex();
      await index?.addDirectory({ path: DEFAULT_DIRECTORY });
      await index?.writeFiles({ outputPath: join(DEFAULT_DIRECTORY, 'pagefind') });
      await index?.writeFiles({ outputPath: join(VERCEL_DIRECTORY, 'pagefind') });
    },
  },
});
