<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<article>
  <h1>{data.post.slug}</h1>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html data.post.html}
</article>
