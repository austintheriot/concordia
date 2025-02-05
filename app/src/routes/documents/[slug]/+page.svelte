<script lang="ts">
  import type { PageData } from './$types';
  import { detectWordUnderPointer } from '$lib/detectWordUnderPointer';
  const { data }: { data: PageData } = $props();

  function onPointerDown(e: PointerEvent): void {
    const word = detectWordUnderPointer(e);
    console.log(word);
  }
</script>

<div class="container" onpointerdown={onPointerDown}>
  <article>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.post.html}
  </article>
</div>
