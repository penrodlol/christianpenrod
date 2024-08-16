import type { Alpine } from 'alpinejs';
// @ts-ignore\
import collapse from '@alpinejs/collapse';
// @ts-ignore
import focus from '@alpinejs/focus';

export default (Alpine: Alpine) => {
  Alpine.plugin([collapse, focus]);
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
