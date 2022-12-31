import type { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const db = new PrismaClient();

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'PUT') return { statusCode: 405 };
  if (!event.body) return { statusCode: 400 };

  const payload = z
    .object({ slug: z.string() })
    .safeParse(JSON.parse(event.body));

  if (!payload.success) return { statusCode: 400 };

  const { views } = await db.postView.upsert({
    update: { views: { increment: 1 } },
    create: { post: payload.data.slug },
    where: { post: payload.data.slug },
    select: { views: true },
  });

  return { statusCode: 200, body: String(views) };
};

export { handler };
