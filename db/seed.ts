import { getCollection } from 'astro:content';
import { db, PostView } from 'astro:db';

export default async function () {
  const posts = await getCollection('posts');
  await db.insert(PostView).values(posts.map((post) => ({ slug: post.id, views: Math.floor(Math.random() * 1000) })));
}
