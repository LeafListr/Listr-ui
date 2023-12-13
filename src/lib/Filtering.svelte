<script lang="ts">
  import { dispensaryStore, productStore } from '../repository/store';
  import Accordion from './Accordion.svelte';
  import { filter } from '../filtering/filtering';

  let selectedDispensary: string;
  let selectedLocation: string;
  let selectedCategory: string;
  let isRecreational: boolean;
  let selectedSubcategory: string;
  let selectedVariant: string;
  let maxPrice: number;
  let minPrice: number;
  let includedBrands: string;
  let excludedBrands: string;

  let loading: boolean;

  $: {
    selectedDispensary = $dispensaryStore.dispensary;
    selectedLocation = $dispensaryStore.location;
    selectedCategory = $productStore.category;
    isRecreational = $dispensaryStore.isRecreational;
    loading = $productStore.productsLoading;
  }

  function combinedFilter() {
    productStore.update(store => ({
      ...store,
      products: [],
      productsLoading: true,
    }));
    filter(
      selectedDispensary,
      selectedLocation,
      isRecreational,
      selectedCategory,
      selectedVariant,
      selectedSubcategory,
      minPrice,
      maxPrice,
      excludedBrands,
      includedBrands,
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
            bind:value={selectedVariant}
          />
        </section>
        <section id="subcategory">
          <label for="subcategory-input">Subcategory</label>
          <input
            type="text"
            id="subcategory-input"
            placeholder="cartridges"
            bind:value={selectedSubcategory}
          />
        </section>
        <section id="minPrice">
          <label for="minPrice-input">Min Price</label>
          <input
            type="text"
            id="minPrice-input"
            placeholder="0"
            bind:value={minPrice}
          />
        </section>
        <section id="maxPrice">
          <label for="maxPrice-input">Max Price</label>
          <input
            type="text"
            id="maxPrice-input"
            placeholder="100"
            bind:value={maxPrice}
          />
        </section>
        <section id="excluded-brands">
          <label for="excluded-brands-input">Excl. Brands</label>
          <input
            type="text"
            id="excluded-brands-input"
            placeholder="brand1,brand2"
            bind:value={excludedBrands}
          />
        </section>
        <section id="included-brands">
          <label for="included-brands-input">Incl. Brands</label>
          <input
            type="text"
            id="included-brands-input"
            placeholder="brand1,brand2"
            bind:value={includedBrands}
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
    width: 100%;
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
  }
</style>
