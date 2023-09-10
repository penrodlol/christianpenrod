import planetscale from '@/libs/planetscale';
import type { APIRoute } from 'astro';
import { getEntry, z } from 'astro:content';

export const prerender = false;

const slugSchema = z.string().refine(async (slug) => !!getEntry('posts', slug.trim()));

export const PUT: APIRoute = async ({ request }) => {
  const payload = await z.object({ slug: slugSchema }).safeParseAsync(await request.json());
  if (!payload.success) return new Response('Bad Request', { status: 400 });

  const rs = await planetscale.transaction(async (t) => {
    await t.execute('update PostView set views = views + 1 where post = ?', [payload.data.slug]);
    return t.execute('select views from PostView where post = ?', [payload.data.slug]);
  });
  const row = z.object({ views: z.coerce.string().trim() }).safeParse(rs.rows[0]);

  return new Response(row.success ? row.data.views : null, { status: 200 });
};
