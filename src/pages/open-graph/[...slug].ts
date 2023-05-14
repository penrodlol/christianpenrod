import { OGImageRoute } from 'astro-og-canvas';

export const { getStaticPaths, get } = OGImageRoute({
  param: 'slug',
  pages: import.meta.glob('/src/content/posts/*.mdx', { eager: true }),
  getImageOptions: (_, post) => {
    const published = new Date(post.frontmatter.published).toDateString();
    const readingTime = `${post.frontmatter.readingTime} Minute Read`;

    return {
      title: post.frontmatter.title,
      description: `\n\n\n\n${published}        ${readingTime}`,
      logo: { path: './src/assets/favicon.webp', size: [80] },
      bgGradient: [[17, 17, 17]],
      border: { color: [212, 212, 216], width: 20 },
      font: {
        title: {
          families: ['Maitree'],
          size: 70,
          color: [255, 255, 255],
          weight: 'Normal',
        },
        description: {
          families: ['Maitree'],
          size: 30,
          color: [161, 161, 170],
          weight: 'Light',
        },
      },
      fonts: [
        'https://api.fontsource.org/v1/fonts/maitree/latin-400-normal.ttf',
        'https://api.fontsource.org/v1/fonts/maitree/latin-300-normal.ttf',
      ],
    };
  },
});
