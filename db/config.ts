import { column, defineDb, defineTable } from 'astro:db';

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    content: column.text({ multiline: true }),
  },
});

const PostView = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    post: column.text({ unique: true }),
    views: column.number({ default: 0 }),
  },
});

export default defineDb({ tables: { Post, PostView } });
