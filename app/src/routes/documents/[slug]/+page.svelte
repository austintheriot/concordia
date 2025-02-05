<script lang="ts">
  import type { PageData } from './$types';
  import { detectWordUnderPointer } from '$lib/detectWordUnderPointer';
  import { replaceMacrons } from '$lib/replaceMacrons';
  const { data }: { data: PageData } = $props();

  async function onPointerDown(e: PointerEvent): Promise<void> {
    const result = detectWordUnderPointer(e);
    if (!result || !result.word) {
      return;
    }
    console.log(result.word);
    const sanitizedWord = replaceMacrons(result.word).toLowerCase();
    const res = await fetch(`/lemmas/${sanitizedWord}.txt`);
    const lemma = await res.text();

    console.log(lemma);
  }
</script>

<div class="container" onpointerdown={onPointerDown}>
  <article>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.post.html}
  </article>
</div>
