import { getCollection } from 'astro:content';
import { Post, PostView, db, sql } from 'astro:db';

export default async function () {
  const posts = await getCollection('posts');

  await db.insert(PostView).values(posts.map((post) => ({ post: post.slug })));
  await db.insert(Post).values(
    posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      slug: post.slug,
      content: post.body,
    })),
  );

  await db.batch([
    db.run(sql`drop table if exists PostSearch`),
    db.run(sql`create virtual table PostSearch using fts5(title, description, slug, content)`),
    db.run(sql`insert into PostSearch select title, description, slug, content from Post`),
  ]);
}
