import type { Alpine } from 'alpinejs';
// @ts-expect-error
import collapse from '@alpinejs/collapse';
// @ts-expect-error
import focus from '@alpinejs/focus';

const _pagefind = await import(/* @vite-ignore */ '.vercel/output/static/pagefind/pagefind');
const pagefind = (Alpine: Alpine) => Alpine.data('pagefind', () => ({ ..._pagefind, data: [] }));

export default (Alpine: Alpine) => Alpine.plugin([collapse, focus, pagefind]);
