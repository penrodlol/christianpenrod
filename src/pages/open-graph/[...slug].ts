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
      logo: { path: './public/og-banner.webp', size: [300] },
      bgGradient: [[24, 25, 38]],
      border: { color: [153, 168, 255], width: 20 },
      font: {
        title: {
          families: ['Nunito'],
          size: 70,
          color: [153, 168, 255],
          weight: 'ExtraBold',
        },
        description: {
          families: ['Nunito'],
          size: 30,
          color: [166, 173, 200],
          weight: 'SemiBold',
        },
      },
      fonts: [
        'https://api.fontsource.org/v1/fonts/nunito/latin-800-normal.ttf',
        'https://api.fontsource.org/v1/fonts/nunito/latin-600-normal.ttf',
      ],
    };
  },
});
