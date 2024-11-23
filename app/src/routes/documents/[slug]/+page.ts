import { getAllMarkdownFiles } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// get post data for each page
export const load: PageLoad = async ({ params }) => {
  const posts = await getAllMarkdownFiles();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    throw error(404, `Post not found for slug ${params.slug}`);
  }

  return {
    post
  };
};

// generate static paths for all blog posts
export async function entries() {
  const posts = await getAllMarkdownFiles();
  const postSlugs = posts.map((post) => ({
    slug: post.slug
  }));
  return postSlugs;
}
