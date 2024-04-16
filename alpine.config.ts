import type { Alpine } from 'alpinejs';
import type { CollectionEntry } from 'astro:content';

export default (Alpine: Alpine) => {
  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('searchPosts', (posts: Array<CollectionEntry<'posts'>>) => ({
    posts,
    query: null as string | null,
    topics: new Set<string>(),
    async init() {
      if (window.Pagefind) return;
      window.Pagefind = await import(/* @vite-ignore */ import.meta.env.PUBLIC_PAGEFIND_URL);
      await window.Pagefind.init();
    },
    async search(query: string) {
      this.query = query?.trim().length ? query.trim() : null;
      await this.execute();
    },
    async filter(topic: string) {
      this.topics.has(topic) ? this.topics.delete(topic) : this.topics.add(topic);
      await this.execute();
    },
    async execute() {
      if (!this.query && !this.topics.size) this.posts = posts;
      else {
        const filters = { filters: { topics: { any: Array.from(this.topics) } } };
        const { results } = await window.Pagefind.search(this.query, filters);

        this.posts = await Promise.all(
          results.map(async (result: any) => {
            const { meta } = await result.data();
            const post = posts.find(({ slug }: any) => slug === meta.slug);
            return { ...post, data: { ...meta, ...(post?.data ?? {}) } };
          }),
        );
      }
    },
  }));
};
