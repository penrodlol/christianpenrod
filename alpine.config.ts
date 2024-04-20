import type { Alpine } from 'alpinejs';

type PagefindResults = { results: Array<{ data: () => Promise<{ meta: Record<string, unknown> }> }> };

export default (Alpine: Alpine) => {
  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('pagefind', (data: Array<Record<string, unknown>>, key: string) => ({
    pagefind: import(/* @vite-ignore */ import.meta.env.PUBLIC_PAGEFIND_URL),
    query: null as string | null,
    tags: [],
    results: data,
    init() {
      this.$watch('query', () => this.execute());
      this.$watch('tags', () => this.execute());
    },
    async execute() {
      if (!this.query?.trim()?.length && !this.tags?.length) this.results = data;
      else {
        const filters = { filters: { tag: { any: this.tags } } };
        const { results }: PagefindResults = await (await this.pagefind).search(this.query, filters);
        const payload = await Promise.all(results.map(async (result) => result.data()));
        this.results = payload.map((item) => data.find((result) => result[key] === item.meta[key])) as typeof data;
      }
    },
  }));
};
