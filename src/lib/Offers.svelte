<script lang="ts">
  import { dispensaryStore } from '../repository/store';
  import type { Offer } from '../repository/types';
  import Accordion from './Accordion.svelte';
  import { getOffers } from '../repository/Offers';

  let offers: Offer[];
  let selectedDispensary: string;
  let selectedLocation: string;

  dispensaryStore.subscribe($dispensaryStore => {
    selectedDispensary = $dispensaryStore.dispensary;
    selectedLocation = $dispensaryStore.location;
    if (selectedDispensary && selectedLocation) {
      getOffers(selectedDispensary, selectedLocation).then(foundOffers => {
        offers = foundOffers;
      });
    }
  });
</script>

{#if selectedDispensary && selectedLocation}
  <Accordion>
    <span slot="head">Offers</span>
    <div slot="details">
      {#each offers as offer}
        <p>{offer.description}</p>
      {/each}
    </div>
  </Accordion>
{/if}

<style>
</style>
