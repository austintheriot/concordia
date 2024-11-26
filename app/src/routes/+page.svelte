<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<div class="container">
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
</div>

<style>
  h1,
  h1 + p {
    text-align: center;
  }

  .container {
    --max-width: 400px;
  }

  ol {
    list-style: none;
    padding-inline-start: 0;
  }
</style>
