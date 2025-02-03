import { getSortedPosts, type GetSortedPosts } from '@/content.utils';
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'fs/promises';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';

export const getStaticPaths: GetStaticPaths = async () =>
  await getSortedPosts().then((posts) => posts.map((post) => ({ params: { id: post.id }, props: post.data })));

export const GET: APIRoute<GetSortedPosts[0]['data']> = async ({ props: post }) => {
  const image = (await readFile('./src/assets/me.png')).toString('base64');
  const fontNormal = await readFile('./node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff');
  const fontBold = await readFile('./node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff');

  const template = html`
    <div class="flex h-full w-full flex-col justify-center bg-black p-10">
      <span class="text-8xl font-semibold text-neutral-50">${post.title}</span>
      <div class="mt-auto flex items-center justify-between">
        <div class="flex items-center text-4xl text-gray-300">
          <span class="mr-8">${post.published.toLocaleDateString()}</span>
          <span>${post.readingTime}</span>
        </div>
        <div class="flex items-center">
          <div
            class="mr-6 flex h-20 w-20 rounded-full border-4 border-neutral-600"
            style="background-image: url(data:image/png;base64,${image}); background-size: 100% 100%;"
          />
          <div class="flex flex-col">
            <span class="text-4xl font-semibold text-neutral-50">CHRISTIAN PENROD</span>
            <span class="text-4xl text-gray-300">Front-End Web Developer</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return satoriAstroOG({ template, width: 1200, height: 630 }).toResponse({
    satori: {
      fonts: [
        { name: 'Geist Sans', data: fontNormal, style: 'normal', weight: 400 },
        { name: 'Geist Sans', data: fontBold, style: 'normal', weight: 700 },
      ],
    },
  });
};
