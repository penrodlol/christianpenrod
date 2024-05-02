import type { APIRoute } from 'astro';
import { getEntry, z } from 'astro:content';
import { PostView, db, eq, sql } from 'astro:db';

export const prerender = false;

const slugSchema = z.string().refine(async (slug) => !!getEntry('posts', slug.trim()));

export const PUT: APIRoute = async ({ request }) => {
  const payload = await z.object({ slug: slugSchema }).safeParseAsync(await request.json());
  if (!payload.success) return new Response('Bad Request', { status: 400 });

  const [rs] = await db
    .update(PostView)
    .set({ views: sql`${PostView.views} + 1` })
    .where(eq(PostView.post, payload.data.slug))
    .returning({ views: PostView.views });

  return new Response(rs?.views?.toString() ?? null, { status: 200 });
};
