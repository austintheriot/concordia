import { getAllMarkdownFiles } from '$lib/utils';
import type { PageLoad } from './$types';

// get post data for each page
export const load: PageLoad = async () => {
  const documents = await getAllMarkdownFiles();
  const documentsWithMacrons = documents.filter((document) => document.attributes.macrons);

  return {
    posts: documentsWithMacrons
  };
};
