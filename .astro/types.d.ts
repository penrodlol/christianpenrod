declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
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

	type ContentConfig = typeof import("../src/content/config");
}
