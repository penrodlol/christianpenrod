import type { Handler } from '@netlify/functions';
import { withPlanetscale } from '@netlify/planetscale';
import { z } from 'zod';

export const handler: Handler = withPlanetscale(async (event, ctx) => {
  if (event.httpMethod !== 'PUT') return { statusCode: 405 };
  if (!event.body) return { statusCode: 400 };

  const body = JSON.parse(event.body);
  const request = z.object({ slug: z.string() }).safeParse(body);

  if (!request.success) return { statusCode: 400 };

  const slug = request.data.slug;
  const db = ctx.planetscale.connection;
  const rs = await db.transaction(async (t) => {
    await t.execute('UPDATE PostView SET views=views+1 WHERE post=?', [slug]);
    return t.execute('SELECT views FROM PostView WHERE post=?', [slug]);
  });

  const response = z.object({ views: z.number() }).safeParse(rs.rows[0]);

  if (!response.success) return { statusCode: 500 };

  return { statusCode: 200, body: String(response.data.views) };
});
