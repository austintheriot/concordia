import { getAllMarkdownFiles } from '$lib/utils';

export async function load() {
  const posts = await getAllMarkdownFiles();
  return {
    posts
  };
}
