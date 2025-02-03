import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';

export const GET: APIRoute = async () => {
  const image = (await readFile('./src/assets/me.png')).toString('base64');
  const template = html`
    <div
      class="flex h-full w-full rounded-full bg-neutral-600"
      style="background-image: url(data:image/png;base64,${image}); background-size: 100% 100%"
    />
  `;

  return satoriAstroOG({ template, width: 1203, height: 1203 }).toResponse({ satori: { fonts: [] } });
};
