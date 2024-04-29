import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.magic('fetch', () => async (...props: Parameters<typeof fetch>) => {
    if (props[1]?.body) props[1].body = JSON.stringify(props[1].body);
    return await fetch(...props).then((res) => res.json());
  });

  Alpine.data('partial', (url: string) => ({
    render() {
      const form = this.$root.querySelector('form') as HTMLFormElement;
      fetch(url, { method: 'POST', body: new FormData(form) }).then(async (response) => {
        const html = new DOMParser().parseFromString(await response.text(), 'text/html');
        const newHTML = html.querySelector('[data-partial-results]') as HTMLElement;
        this.$root.querySelector('[data-partial-results]')?.replaceWith(newHTML);
      });
    },
  }));
};
