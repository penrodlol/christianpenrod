import { db, PostView, sql } from 'astro:db';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { readdir, readFile } from 'node:fs/promises';

export default async function () {
  const postsFileNames = await readdir('src/data/posts', { withFileTypes: true });
  const postsContents = await Promise.all(
    postsFileNames.map(async (file) => {
      const post = (await readFile(`src/data/posts/${file.name}`, 'utf-8')).replace(/---[\s\S]*?---/, '');
      const body = toString(fromMarkdown(post), { includeHtml: false }).replaceAll('\n', ' ');
      return sql`(${file.name.replace(/\.mdx$/, '')}, ${body})`;
    }),
  );

  await db.batch([
    db.insert(PostView).values(postsFileNames.map((post) => ({ post: post.name.replace(/\.mdx$/, '') }))),
    db.run(sql`drop table if exists PostSearch`),
    db.run(sql`create virtual table PostSearch using fts5(slug unindexed, body)`),
    db.run(sql.join([sql`insert into PostSearch (slug, body) values `, sql.join(postsContents, sql`,`)])),
  ]);
}
