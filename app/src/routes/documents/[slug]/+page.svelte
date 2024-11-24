<script lang="ts">
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<article>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html data.post.html}
</article>
