<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<h1>Concordia</h1>
<p>Librī Symbolicī Ecclēsiae Lutherānae</p>

<nav>
  <h2>Argūmentum</h2>
  <ol>
    {#each data.posts as post}
      <li>
        <a href={`./documents/${post.slug}`}>{post.attributes.title}</a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  ol {
    list-style: none;
    padding-inline-start: 0;
  }
</style>
