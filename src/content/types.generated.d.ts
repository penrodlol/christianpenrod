declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"posts": {
"astro-shiki-syntax-highlighting-with-css-variables.mdx": {
  id: "astro-shiki-syntax-highlighting-with-css-variables.mdx",
  slug: "astro-shiki-syntax-highlighting-with-css-variables",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"developing-browser-extensions-with-nextjs.mdx": {
  id: "developing-browser-extensions-with-nextjs.mdx",
  slug: "developing-browser-extensions-with-nextjs",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"hyper-terminal-and-its-arsenal-of-plugins.mdx": {
  id: "hyper-terminal-and-its-arsenal-of-plugins.mdx",
  slug: "hyper-terminal-and-its-arsenal-of-plugins",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"local-state-with-ngrx-and-apollo-angular.mdx": {
  id: "local-state-with-ngrx-and-apollo-angular.mdx",
  slug: "local-state-with-ngrx-and-apollo-angular",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"tailwindcss-responsive-design-without-breakpoints.mdx": {
  id: "tailwindcss-responsive-design-without-breakpoints.mdx",
  slug: "tailwindcss-responsive-design-without-breakpoints",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
},
"roles": {
"laroche.md": {
  id: "laroche.md",
  slug: "laroche",
  body: string,
  collection: "roles",
  data: InferEntrySchema<"roles">
},
"mckesson.md": {
  id: "mckesson.md",
  slug: "mckesson",
  body: string,
  collection: "roles",
  data: InferEntrySchema<"roles">
},
},

	};

	type ContentConfig = typeof import("./config");
}
