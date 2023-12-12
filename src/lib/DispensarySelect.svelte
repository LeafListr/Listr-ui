<script lang="ts">
  import { getDispensaries } from '../repository/Dispensaries';
  import { dispensaryStore, productStore } from '../repository/store';
  import type { Dispensary } from '../repository/types';

  let dispensaries: Dispensary[] = [];

  $: {
    const { isRecreational } = $dispensaryStore;
    getDispensaries(isRecreational).then(foundDispensaries => {
      dispensaries = foundDispensaries;
    });
  }
</script>

<h2 class="dispensary-name">Now Viewing: {$dispensaryStore.dispensary}</h2>
<select
  bind:value={$dispensaryStore.dispensary}
  disabled={dispensaries.length === 0 || $productStore.productsLoading}
>
  <option value="">Select Dispensary</option>
  {#each dispensaries as dispensary}
    <option value={dispensary}>{dispensary}</option>
  {/each}
</select>
