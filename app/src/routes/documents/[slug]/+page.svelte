<script lang="ts">
  import type { PageData } from './$types';
  import { detectWordUnderPointer } from '$lib/detectWordUnderPointer';
  import { replaceMacrons } from '$lib/replaceMacrons';
  import { Popover } from 'bits-ui';
  const { data }: { data: PageData } = $props();

  let popoverOpen = $state(false);
  let popoverInformation = $state('');

  async function onPointerDown(e: PointerEvent): Promise<void> {
    try {
      const detectedWordResult = detectWordUnderPointer(e);
      if (!detectedWordResult || !detectedWordResult.word) {
        return;
      }
      const sanitizedWord = replaceMacrons(detectedWordResult.word).toLowerCase();
      const lemmaInformationRes = await fetch(`/lemmas/${sanitizedWord}.txt`);
      if (lemmaInformationRes.ok) {
        const lemmaInformation = await lemmaInformationRes.text();
        popoverOpen = true;
        popoverInformation = lemmaInformation;
      } else {
        popoverOpen = true;
        popoverInformation = 'No lemma found';
      }
    } catch (e) {
      console.error('Failed to fetch lemma', e);
      popoverOpen = true;
      popoverInformation = 'No lemma found';
    }
  }
</script>

<div class="container" onpointerdown={onPointerDown}>
  <Popover.Root bind:open={popoverOpen}>
    <Popover.Trigger />
    <Popover.Content class="popover-content">
      <Popover.Close />
      <Popover.Arrow />
      {popoverInformation}
    </Popover.Content>
  </Popover.Root>
  <article>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.post.html}
  </article>
</div>

<style>
</style>
