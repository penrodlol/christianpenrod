import type { APIRoute } from 'astro';
import { getCollection, z } from 'astro:content';
import { db, eq, PostView, sql } from 'astro:db';

const schema = z.string().refine(async (id) => (await getCollection('posts')).find((post) => post.id === id));

export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const id = await schema.safeParseAsync((await request.json()).id);
  if (!id.success) return new Response(JSON.stringify({ views: 0 }), { status: 200 });

  const views = await db
    .update(PostView)
    .set({ views: sql`${PostView.views} + 1` })
    .where(eq(PostView.slug, id.data))
    .returning({ views: PostView.views })
    .get()
    .then((res) => Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(res?.views ?? 0))
    .catch(() => 0);

  return new Response(JSON.stringify({ views }), { status: 200 });
};
