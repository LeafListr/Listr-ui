<script lang="ts">
  import { getDispensaries } from '../repository/Dispensaries';
  import { onMount } from 'svelte';
  import { dispensaryStore } from '../repository/store';
  import type { Dispensary } from '../repository/types';

  let dispensaries: Dispensary[] = [];

  onMount(async () => {
    dispensaries = await getDispensaries();
  });

  function changeDispensary(event: Event) {
    const target = event.target as HTMLSelectElement;
    dispensaryStore.update(store => ({
      ...store,
      dispensary: target.value,
    }));
  }
</script>

<select on:change={changeDispensary}>
  <option value="">Select Dispensary</option>
  {#each dispensaries as dispensary}
    <option value={dispensary}>{dispensary}</option>
  {/each}
</select>
