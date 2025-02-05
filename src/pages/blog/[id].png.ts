import { getSortedPosts, type GetSortedPosts } from '@/content.utils';
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'fs/promises';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';

export const getStaticPaths: GetStaticPaths = async () =>
  await getSortedPosts().then((posts) => posts.map((post) => ({ params: { id: post.id }, props: post.data })));

export const GET: APIRoute<GetSortedPosts[0]['data']> = async ({ props: post, params: { id } }) => {
  const imageBanner = (await readFile(`./src/content/${id}.dark.png`)).toString('base64');
  const imageMe = (await readFile('./src/assets/me.png')).toString('base64');
  const fontSans = await readFile('./node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff');
  const fontSerif = await readFile('./node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-500-normal.woff');

  const template = html`
    <div class="relative flex h-full w-full flex-col justify-center bg-black p-10">
      <div
        class="absolute inset-10 flex h-full w-full opacity-50"
        style="background-image: url(data:image/png;base64,${imageBanner}); background-size: 100% 100%;"
      />
      <div class="flex h-full w-full flex-col justify-between bg-black/10 p-10">
        <span style="font-family:serif" class="text-8xl text-neutral-300">${post.title}</span>
        <div style="font-family:sans" class="flex items-center justify-between text-neutral-400">
          <div class="flex items-center text-4xl">
            <span class="mr-8">${post.published.toLocaleDateString()}</span>
            <span>${post.readingTime}</span>
          </div>
          <div class="flex items-center">
            <div
              class="mr-6 flex h-20 w-20 rounded-full border-4 border-neutral-600 bg-black"
              style="background-image: url(data:image/png;base64,${imageMe}); background-size: 100% 100%;"
            />
            <span class="text-4xl font-semibold text-neutral-300">CHRISTIAN PENROD</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return satoriAstroOG({ template, width: 1200, height: 630 }).toResponse({
    satori: {
      fonts: [
        { name: 'sans', data: fontSans, style: 'normal', weight: 400 },
        { name: 'serif', data: fontSerif, style: 'normal', weight: 500 },
      ],
    },
  });
};
