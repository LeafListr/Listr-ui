<script lang="ts">
  import Filtering from './lib/Filtering.svelte';
  import Navigation from './lib/Navigation.svelte';
  import Offers from './lib/Offers.svelte';
  import Products from './lib/Products.svelte';
  import Sorting from './lib/components/Sorting.svelte';

  // poor mans feature flag
  let sortEnabled = false;
  if (window.location.search.includes('sort')) {
    sortEnabled = true;
  }

</script>

<main>
  <Navigation />
  <Offers />
  <Filtering />
  {#if sortEnabled}
    <Sorting />
  {/if}
  <Products />
</main>
