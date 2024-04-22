import type { Alpine } from 'alpinejs';

type PagefindResult = Record<string, unknown>;
type PagefindResults = { results: Array<{ data: () => Promise<{ meta: PagefindResult }> }> };

export default (Alpine: Alpine) => {
  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('pagefind', (data: Array<PagefindResult>, key: string) => ({
    query: null as string | null,
    tags: [],
    results: data,
    async init() {
      this.$watch('query', () => this.execute());
      this.$watch('tags', () => this.execute());

      if (window.Pagefind) return;
      window.Pagefind = await import(String(/* @vite-ignore */ import.meta.env.PUBLIC_PAGEFIND_URL));
      await window.Pagefind.init();
    },
    async execute() {
      if (!this.query?.trim()?.length && !this.tags?.length) this.results = data;
      else {
        const filters = { filters: { tag: { any: this.tags } } };
        const { results }: PagefindResults = await window.Pagefind.search(this.query, filters);
        const payload = await Promise.all(results.map(async (result) => result.data()));
        this.results = payload.map((item) => data.find((result) => result[key] === item.meta[key])) as typeof data;
      }
    },
  }));
};
