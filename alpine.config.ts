import type { Alpine } from 'alpinejs';
// @ts-ignore\
import collapse from '@alpinejs/collapse';
// @ts-ignore
import focus from '@alpinejs/focus';

// @ts-ignore
const _pagefind = await import(/* @vite-ignore */ '.vercel/output/static/pagefind/pagefind');
const pagefind = (Alpine: Alpine) => Alpine.data('pagefind', () => ({ ..._pagefind, data: [] }));

export default (Alpine: Alpine) => Alpine.plugin([collapse, focus, pagefind]);
