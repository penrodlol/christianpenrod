import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('partial', (url: string) => ({
    submit() {
      const form = this.$root.querySelector('form') as HTMLFormElement;
      const originalHTML = this.$root.querySelector('[data-partial-results]') as HTMLElement;

      fetch(url, { method: 'POST', body: new FormData(form) }).then(async (response) => {
        const newHTML = new DOMParser().parseFromString(await response.text(), 'text/html');
        originalHTML.replaceWith(newHTML.querySelector('[data-partial-results]')!);
      });
    },
  }));
};
