<script lang="ts">
  import { getDispensaryLocations } from '../repository/Dispensaries';
  import { dispensaryStore, productStore } from '../repository/store';
  import type { Location } from '../repository/types';

  let locations: Location[] = [];

  $: {
    const { dispensary, isRecreational } = $dispensaryStore;
    if (dispensary) {
      getDispensaryLocations(dispensary, isRecreational).then(locs => {
        locations = locs;
      });
    } else {
      $dispensaryStore.location = '';
      locations = [];
    }
  }
</script>

<select
  bind:value={$dispensaryStore.location}
  disabled={locations.length === 0 || $productStore.productsLoading}
>
  <option value="">Select Location</option>
  {#each locations as location}
    <option value={location.id}>{location.name}</option>
  {/each}
</select>
