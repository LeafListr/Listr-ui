<script lang="ts">
  import { dispensaryStore, productStore } from '../../repository/store';
  import Accordion from '../Accordion.svelte';
  import { sorter } from '../../sorting/sorting';
  import type { Terpene } from '../../repository/types';
  import { getTerpenes } from '../../repository/Terpenes';

  let selectedDispensary: string;
  let selectedLocation: string;
  let selectedCategory: string;
  let isRec: boolean;
  let sortMethod: string;
  let terp1: string;
  let terp2: string;
  let terp3: string;

  let loading: boolean;
  let terpenes: Terpene[] = [];

  $: {
    const { dispensary, location, isRecreational } = $dispensaryStore;
    selectedDispensary = dispensary;
    selectedLocation = location;
    isRec = isRecreational;

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
    sorter(
      selectedDispensary,
      selectedLocation,
      isRec,
      selectedCategory,
      sortMethod,
      terp1,
      terp2,
      terp3,
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
          <label for="sort-method-input">Sort Method</label>
          <select bind:value={sortMethod}>
            <option value="">Select Price Sorter</option>
            <option value="price_asc">Price Asc</option>
            <option value="price_desc">Price Desc</option>
          </select>
        </section>
        <section id="terps">
          <label for="terp1-input">Terp1</label>
          <select bind:value={terp1}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
          <label for="terp2-input">Terp2</label>
          <select bind:value={terp2}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
          <label for="terp3-input">Terp3</label>
          <select bind:value={terp3}>
            <option value="">Select Terpene</option>
            {#each terpenes as terpene}
              <option value={terpene.name}>{terpene.name}</option>
            {/each}
          </select>
        </section>
        <button type="submit" disabled={loading}> Sort </button>
      </form>
    </div></Accordion
  >
{/if}

<style>
  #sorter-form {
    display: grid;
    grid-template-areas: 'submit submit';
    gap: 10px;
    margin: 7px;
    padding-bottom: 7px;
  }
  #sorter-form select {
    width: 100%;
  }
  button {
    grid-area: submit;
  }
</style>
