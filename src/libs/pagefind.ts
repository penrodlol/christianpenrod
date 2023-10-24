declare global {
  interface Window {
    pagefind: { init: Init; search: Search };
  }
}

type Init = () => Promise<void>;
type SearchOpts = { filters: Record<string, Record<string, Array<string>>> };
type SearchData = { raw_url: string; meta: Record<string, string> };
type SearchResponse = { results: Array<{ data: () => Promise<SearchData> }> };
type Search = (search: string | null, opts?: SearchOpts) => Promise<SearchResponse>;

export const prepareSearch = async () => {
  if (window.pagefind) return;
  window.pagefind = await import(/* @vite-ignore */ import.meta.env.PUBLIC_PAGEFIND_URL);
  await window.pagefind.init();
};

export const executeSearch = async (search: string, topics: Array<string>) => {
  const _search = search.trim().length ? search.trim() : null;
  const _filters = { filters: { topics: { any: topics } } };
  const { results } = await window.pagefind.search(_search, _filters);
  return Promise.all(results.map(async (result) => result.data()));
};
