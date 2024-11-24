export interface Frontmatter {
  title: string;
  macrons: boolean;
}

export async function getAllMarkdownFiles() {
  const markdownFiles = import.meta.glob('../../../documents/**/*.md');
  const iterableFiles = Object.entries(markdownFiles);

  const posts = await Promise.all(
    iterableFiles.map(async ([filepath, resolver]) => {
      const markdownValues = await resolver();
      const { html, attributes } = markdownValues as { attributes: Frontmatter; html: string };
      const slug = filepath.replace('../../../documents/', '').replace('.md', '');

      return {
        slug,
        html,
        attributes
      };
    })
  );

  return posts;
}
