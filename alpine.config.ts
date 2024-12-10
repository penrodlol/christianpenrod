import type { Alpine } from 'alpinejs';
// @ts-ignore\
import collapse from '@alpinejs/collapse';
// @ts-ignore
import focus from '@alpinejs/focus';

export default (Alpine: Alpine) => Alpine.plugin([collapse, focus]);
