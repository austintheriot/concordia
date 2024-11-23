<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<h1>Concordia</h1>
<h2>Librī symbolicī Ecclēsiae Lutherānae</h2>
<nav>
  {#each data.slugs as slug}
    <li>
      <a href={`./documents/${slug}`}>{slug}</a>
    </li>
  {/each}
</nav>
