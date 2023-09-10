import { connect } from '@planetscale/database';
import { z } from 'zod';

export const config = { runtime: 'edge' };

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const planetscale = connect({
  host: z.string().parse(process.env.PLANETSCALE_DB_HOST),
  username: z.string().parse(process.env.PLANETSCALE_DB_USERNAME),
  password: z.string().parse(process.env.PLANETSCALE_DB_PASSWORD),
});

export default async function handler(req: Request): Promise<Response> {
  const payload = await z.object({ slug: slugSchema }).safeParseAsync(await req.json());
  if (!payload.success) return new Response('Bad Request', { status: 400 });

  const rs = await planetscale.transaction(async (t) => {
    await t.execute('update PostView set views = views + 1 where post = ?', [payload.data.slug]);
    return t.execute('select views from PostView where post = ?', [payload.data.slug]);
  });
  const row = z.object({ views: z.coerce.string().trim() }).safeParse(rs.rows[0]);

  return new Response(row.success ? row.data.views : null, { status: 200 });
}
