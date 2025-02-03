// This is a temporary workaround: https://github.com/withastro/astro/issues/12744

export const prerender = false;
export const POST = () => new Response(JSON.stringify({}), { status: 200 });
