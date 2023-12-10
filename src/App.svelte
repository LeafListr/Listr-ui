<script lang="ts">
  import { onMount } from 'svelte';
  import Filtering from './lib/Filtering.svelte';
  import Navigation from './lib/Navigation.svelte';
  import Offers from './lib/Offers.svelte';
  import Products from './lib/Products.svelte';

  let showFiltering = false;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    showFiltering = params.has('enableFiltering');
  });
</script>

<main>
  <Navigation />
  <Offers />
  {#if showFiltering}
    <Filtering />
  {/if}
  <Products />
</main>
