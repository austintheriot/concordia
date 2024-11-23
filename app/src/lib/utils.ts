export async function getAllMarkdownFiles() {
  const markdownFiles = import.meta.glob('../../../documents/**/*.md');
  const iterableFiles = Object.entries(markdownFiles);

  const posts = await Promise.all(
    iterableFiles.map(async ([filepath, resolver]) => {
      const { html, attributes } = await resolver();
      const slug = filepath.replace('../../../documents/', '').replace('.md', '');
      console.log(slug);

      return {
        slug,
        html,
        attributes
      };
    })
  );

  return posts;
}
