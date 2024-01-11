<script lang="ts">
  import {
    dispensaryStore,
    productStore,
    transformStore,
  } from '../../repository/store';
  import Accordion from '../Accordion.svelte';
  import {
    sortAndFilter,
    newSortAndFilterParams,
  } from '../../transformations/sortAndFilter';
  import type { Terpene } from '../../repository/types';
  import { getTerpenes } from '../../repository/Terpenes';

  let selectedDispensary: string;
  let selectedLocation: string;
  let selectedCategory: string;

  let loading: boolean;
  let terpenes: Terpene[] = [];

  $: {
    const { dispensary, location, isRecreational } = $dispensaryStore;
    selectedDispensary = dispensary;
    selectedLocation = location;

    if (selectedDispensary && selectedLocation) {
      getTerpenes(selectedDispensary, selectedLocation, isRecreational).then(
        foundTerpenes => {
          terpenes = foundTerpenes;
        },
      );
    } else {
      terpenes = [];
    }
  }

  $: {
    const { category, productsLoading } = $productStore;
    selectedCategory = category;
    loading = productsLoading;
  }

  function combinedSorter() {
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
    <div slot="head">Sorters</div>
    <div slot="details">
      <form id="sorter-form" on:submit|preventDefault={combinedSorter}>
        <section id="sort-method">
          <label for="sort-method-input">Price Sort Method</label>
          <select bind:value={$transformStore.priceSortMethod}>
            <option value="">Select Price Sorter</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </section>
        <section id="thc-sort-method">
          <label for="thc-sort-method-input">THC Sort Method</label>
          <select bind:value={$transformStore.thcSortMethod}>
            <option value="">Select THC Sorter</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </section>
        <section id="terps">
          <label for="terp1-input">Terpene #1</label>
          <select bind:value={$transformStore.terp1}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
          <label for="terp2-input">Terpene #2</label>
          <select bind:value={$transformStore.terp2}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
          <label for="terp3-input">Terpene #3</label>
          <select bind:value={$transformStore.terp3}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
        </section>
        <button type="submit" disabled={loading}> Sort </button>
      </form>
    </div>
  </Accordion>
{/if}

<style>
  #sorter-form {
    display: grid;
    grid-template-areas:
      'sort-method terps'
      'thc-sort-method terps'
      'submit submit';
    gap: 10px;
    margin: 7px;
    padding-bottom: 7px;
  }
  #sorter-form select {
    width: 100%;
  }

  #sort-method {
    grid-area: sort-method;
  }

  #terps {
    grid-area: terps;
  }

  button {
    grid-area: submit;
    border: 1px solid #858585;
  }
</style>
