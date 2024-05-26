import type { Alpine } from 'alpinejs';
// @ts-ignore\
import collapse from '@alpinejs/collapse';
// @ts-ignore
import focus from '@alpinejs/focus';

export default (Alpine: Alpine) => {
  Alpine.plugin([collapse, focus]);

  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('partial', (url: string) => ({
    loading: false,
    failed: false,
    submission: new FormData(),
    submit() {
      const form = this.$root.querySelector('form') as HTMLFormElement;
      const originalHTML = this.$root.querySelector('[data-partial-results]') as HTMLElement;
      this.submission = new FormData(form);
      this.loading = true;

      fetch(url, { method: 'POST', body: this.submission }).then(async (response) => {
        const newHTML = new DOMParser().parseFromString(await response.text(), 'text/html');
        this.loading = false;
        this.failed = !response.ok;
        originalHTML.replaceWith(newHTML.querySelector('[data-partial-results]') as typeof originalHTML);
      });
    },
  }));
};
