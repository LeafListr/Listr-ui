<script lang="ts">
  import {
    dispensaryStore,
    productStore,
    transformStore,
  } from '../repository/store';
  import {
    newSortAndFilterParams,
    sortAndFilter,
  } from '../transformations/sortAndFilter';
  import Accordion from './Accordion.svelte';

  let selectedDispensary: string;
  let selectedLocation: string;
  let selectedCategory: string;

  let loading: boolean;

  $: {
    selectedDispensary = $dispensaryStore.dispensary;
    selectedLocation = $dispensaryStore.location;
    selectedCategory = $productStore.category;
    loading = $productStore.productsLoading;
  }

  function combinedFilter() {
    productStore.update(store => ({
      ...store,
      products: [],
      productsLoading: true,
    }));
    sortAndFilter(
      newSortAndFilterParams($dispensaryStore, $productStore, $transformStore),
    ).then(foundProducts => {
      productStore.update(store => ({
        ...store,
        products: foundProducts,
        productsLoading: false,
      }));
    });
  }
</script>

{#if selectedDispensary && selectedLocation && selectedCategory}
  <Accordion>
    <div slot="head">Filters</div>
    <div slot="details">
      <form id="filter-form" on:submit|preventDefault={combinedFilter}>
        <section id="variants">
          <label for="variants-input">Variants</label>
          <input
            type="text"
            id="variants-input"
            placeholder="1oz,1g"
            bind:value={$transformStore.variants}
          />
        </section>
        <section id="subcategory">
          <label for="subcategory-input">Subcategory</label>
          <input
            type="text"
            id="subcategory-input"
            placeholder="cartridges"
            bind:value={$transformStore.subcategory}
          />
        </section>
        <section id="minPrice">
          <label for="minPrice-input">Min Price</label>
          <input
            type="text"
            id="minPrice-input"
            placeholder="0"
            bind:value={$transformStore.minPrice}
          />
        </section>
        <section id="maxPrice">
          <label for="maxPrice-input">Max Price</label>
          <input
            type="text"
            id="maxPrice-input"
            placeholder="100"
            bind:value={$transformStore.maxPrice}
          />
        </section>
        <section id="excluded-brands">
          <label for="excluded-brands-input">Excl. Brands</label>
          <input
            type="text"
            id="excluded-brands-input"
            placeholder="brand1,brand2"
            bind:value={$transformStore.excludedBrands}
          />
        </section>
        <section id="included-brands">
          <label for="included-brands-input">Incl. Brands</label>
          <input
            type="text"
            id="included-brands-input"
            placeholder="brand1,brand2"
            bind:value={$transformStore.includedBrands}
          />
        </section>
        <button type="submit" disabled={loading}> Filter </button>
      </form>
    </div></Accordion
  >
{/if}

<style>
  #filter-form {
    display: grid;
    grid-template-areas:
      'variants subcategory'
      'minPrice maxPrice'
      'excluded-brands included-brands'
      'submit submit';
    gap: 10px;
    margin: 7px;
    padding-bottom: 7px;
  }
  #filter-form input {
    width: 90%;
  }
  #variants {
    grid-area: variants;
  }
  #subcategory {
    grid-area: subcategory;
  }
  #minPrice {
    grid-area: minPrice;
  }
  #maxPrice {
    grid-area: maxPrice;
  }
  button {
    grid-area: submit;
    border: 1px solid #858585;
  }
</style>
