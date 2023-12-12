<script lang="ts">
  import { getCategories } from '../repository/Categories';
  import type { Category } from '../repository/types';
  import { dispensaryStore, productStore } from '../repository/store';
  import { getProductsForCategory } from '../repository/Products';

  let categories: Category[] = [];

  $: {
    const { dispensary, location, isRecreational } = $dispensaryStore;
    if (dispensary && location) {
      getCategories(dispensary, location, isRecreational).then(
        foundCategories => {
          categories = foundCategories;
        },
      );
    } else {
      $productStore.category = '';
      categories = [];
    }
  }

  function handleOnChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target.value || !$dispensaryStore.dispensary || !$dispensaryStore.location) {
      return;
    }
    productStore.update(store => ({
      ...store,
      productsLoading: true,
    }));
    getProductsForCategory(
      $dispensaryStore.dispensary,
      $dispensaryStore.location,
      $dispensaryStore.isRecreational,
      target.value,
    ).then(foundProducts => {
      productStore.update(store => ({
        ...store,
        products: foundProducts,
        productsLoading: false,
      }));
    });
  }
</script>

<select
  bind:value={$productStore.category}
  on:change={handleOnChange}
  disabled={categories.length === 0 || $productStore.productsLoading}
>
  <option value="">Select Category</option>
  {#each categories as category}
    <option value={category}
      >{category.charAt(0).toUpperCase() +
        category.slice(1).toLowerCase().split('_').join(' ')}</option
    >
  {/each}
</select>
