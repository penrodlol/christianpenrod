import { OGImageRoute } from 'astro-og-canvas';

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages: import.meta.glob('/src/content/posts/**/*.mdx', { eager: true }),
  getImageOptions: (_, post) => {
    const published = new Date(post.frontmatter.published).toDateString();
    const readingTime = `${post.frontmatter.readingTime} Minute Read`;

    return {
      title: post.frontmatter.title,
      description: `\n\n\n\n\n\n${published}        ${readingTime}`,
      logo: { path: './src/assets/favicon.webp', size: [60] },
      bgGradient: [[0, 0, 0]],
      border: { color: [10, 10, 10], width: 20 },
      font: {
        title: { families: ['Inter'], size: 60, color: [163, 163, 163], weight: 'Normal' },
        description: { families: ['Inter'], size: 20, color: [115, 115, 115], weight: 'Normal' },
      },
      fonts: ['https://api.fontsource.org/v1/fonts/inter/latin-400-normal.ttf'],
    };
  },
});
