import { connect } from '@planetscale/database';
import { z } from 'zod';

export const config = { runtime: 'edge' };

const db = connect({
  host: z.string().parse(process.env.PLANETSCALE_DB_HOST),
  username: z.string().parse(process.env.PLANETSCALE_DB_USERNAME),
  password: z.string().parse(process.env.PLANETSCALE_DB_PASSWORD),
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'PUT') return new Response('Not Allowed', { status: 405 });

  const payload = z.object({ slug: z.string() }).safeParse(await req.json());
  if (!payload.success) return new Response('Bad Request', { status: 400 });

  const slug = payload.data.slug;
  const rs = await db.transaction(async (t) => {
    await t.execute('update PostView set views=views+1 where post=?', [slug]);
    return t.execute('select views from PostView where post=?', [slug]);
  });

  const row = z.object({ views: z.coerce.string() }).safeParse(rs.rows[0]);
  const views = row.success ? row.data.views : null;
  return new Response(views, { status: 200 });
}
