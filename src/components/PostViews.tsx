import { supabase } from '@lib/supabase';
import type { CollectionEntry } from 'astro:content';
import { Eye } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';

type Props = { slug: CollectionEntry<'posts'>['slug'] };

const PostViews = ({ slug }: Props) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    supabase
      .rpc('view_post', { slug })
      .then(({ data }) => setViews((prev) => Number(data ?? prev)));
  }, [slug]);

  return (
    <div class="flex items-center gap-3 rounded-md bg-2 py-3 px-5">
      <Eye class="h-6 w-6 stroke-brand-2" aria-hidden />
      <span class="tracking-widest" aria-label={`${views} views`}>
        {String(views ?? 0).padStart(6, '0')}
      </span>
    </div>
  );
};

export default PostViews;
