import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';

export const GET: APIRoute = async () => {
  const image = (await readFile('./src/assets/me.png')).toString('base64');
  const font = await readFile('./node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-700-normal.woff');

  const template = html`
    <div class="flex h-full w-full flex-col items-center justify-center bg-black p-10">
      <div
        class="absolute -top-32 -left-96 z-0 flex h-[200%] w-240 opacity-40"
        style="background-image: url(data:image/png;base64,${image}); background-size: 100% 100%"
      />
      <span class="text-8xl text-neutral-50">CHRISTIAN PENROD</span>
      <span class="text-7xl text-neutral-300">Front-End Web Developer</span>
    </div>
  `;

  return satoriAstroOG({ template, width: 1200, height: 630 }).toResponse({
    satori: { fonts: [{ name: 'font', data: font, style: 'normal', weight: 700 }] },
  });
};
