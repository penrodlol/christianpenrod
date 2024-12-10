import { column, defineDb, defineTable } from 'astro:db';

export default defineDb({
  tables: {
    PostView: defineTable({
      columns: {
        id: column.number({ primaryKey: true }),
        slug: column.text({ unique: true }),
        views: column.number({ default: 0 }),
      },
    }),
  },
});
