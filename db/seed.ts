import { db, PostView } from 'astro:db';
import { readdir } from 'node:fs/promises';

export default async function () {
  const posts = await readdir('src/data/posts', { withFileTypes: true });
  await db.insert(PostView).values(posts.map((post) => ({ post: post.name.replace(/\.mdx$/, '') })));
}
