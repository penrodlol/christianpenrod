import { z } from 'zod';

export const config = { runtime: 'edge' };

export default async function handler(): Promise<Response> {
  const token = z.string().safeParse(process.env.VERCEL_DEPLOY_WEBHOOK_TOKEN);
  if (!token.success) return new Response('Unauthorized', { status: 401 });

  return fetch(`https://api.vercel.com/v1/integrations/deploy/${token.data}`)
    .then((res) => new Response(JSON.stringify(res.json()), { status: 200 }))
    .catch((err) => new Response(err.message, { status: 500 }));
}
