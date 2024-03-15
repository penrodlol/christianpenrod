import { getCollection } from 'astro:content';
import { db, PostView } from 'astro:db';

export default async function () {
  await db
    .insert(PostView)
    .values((await getCollection('posts')).map((post) => ({ post: post.slug })));
}
