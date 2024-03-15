import { column, defineDb, defineTable } from 'astro:db';

const PostView = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    post: column.text({ unique: true }),
    views: column.number({ default: 0 }),
  },
});

export default defineDb({ tables: { PostView } });
