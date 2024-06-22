import { getCollection } from 'astro:content';
import { PostView, db, sql } from 'astro:db';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

export default async function () {
  const posts = await getCollection('posts');
  const postsSearches = posts
    .map((post) => ({ slug: post.slug, body: toString(fromMarkdown(post.body), { includeHtml: false }) }))
    .map((post) => sql`(${post.slug}, ${post.body.replaceAll('\n', ' ')})`);

  await db.batch([
    db.insert(PostView).values(posts.map((post) => ({ post: post.slug }))),
    db.run(sql`drop table if exists PostSearch`),
    db.run(sql`create virtual table PostSearch using fts5(slug unindexed, body)`),
    db.run(sql.join([sql`insert into PostSearch (slug, body) values `, sql.join(postsSearches, sql`,`)])),
  ]);
}
