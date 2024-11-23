import { getAllMarkdownFiles } from '$lib/utils';
import type { PageLoad } from './$types';

// get post data for each page
export const load: PageLoad = async () => {
  const posts = await getAllMarkdownFiles();
  const slugs = posts.map((post) => post.slug);

  return {
    slugs
  };
};
