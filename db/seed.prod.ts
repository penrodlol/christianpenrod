import { db, sql } from 'astro:db';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { readFile, readdir } from 'node:fs/promises';

export default async function () {
  const posts = await Promise.all(
    (await readdir('src/content/posts', { withFileTypes: true })).map(async (file) => {
      const post = (await readFile(`src/content/posts/${file.name}`, 'utf-8')).replace(/---[\s\S]*?---/, '');
      const body = toString(fromMarkdown(post), { includeHtml: false }).replaceAll('\n', ' ');
      return sql`(${file.name.replace(/\.mdx$/, '')}, ${body})`;
    }),
  );

  await db.batch([
    db.run(sql`create virtual table if not exists PostSearch using fts5(slug unindexed, body)`),
    db.run(sql`
      with target(slug, body) as (values ${sql.join(posts, sql`, `)})
      update PostSearch
      set body = target.body
      from target
      where target.slug = PostSearch.slug
      and target.body != PostSearch.body;
    `),
    db.run(sql`
      with target(slug, body) as (values ${sql.join(posts, sql`, `)})
      insert into PostSearch (slug, body)
      select slug, body from target
      where not exists (select 1 from PostSearch where slug = target.slug);
    `),
  ]);
}
