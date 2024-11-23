import { getAllMarkdownFiles } from '$lib/utils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const posts = await getAllMarkdownFiles();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return {
    post
  };
}

// Generate static paths for all blog posts
export async function entries() {
  const posts = await getAllMarkdownFiles();
  return posts.map((post) => ({
    slug: post.slug
  }));
}
