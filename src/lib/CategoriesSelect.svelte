<script lang="ts">
  import { getCategories } from '../repository/Categories';
  import type { Category } from '../repository/types';
  import { dispensaryStore, productStore } from '../repository/store';
  import { getProductsForCategory } from '../repository/Products';

  let categories: Category[] = [];
  let selectedDispensary: string;
  let selectedLocation: string;
  let loading = false;

  dispensaryStore.subscribe($dispensaryStore => {
    selectedDispensary = $dispensaryStore.dispensary;
    selectedLocation = $dispensaryStore.location;
    if (selectedLocation && selectedDispensary) {
      loading = true;
      loadCategories().then(() => {
        loading = false;
      });
    }
  });

  async function loadCategories() {
    categories = await getCategories(selectedDispensary, selectedLocation);
  }

  function selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    let selectedCategory = target.value;
    productStore.update(store => ({
      ...store,
      products: [],
      productsLoading: true,
      category: selectedCategory,
    }));
    getProductsForCategory(
      selectedDispensary,
      selectedLocation,
      selectedCategory,
    ).then(foundProducts => {
      productStore.update(store => ({
        ...store,
        products: foundProducts,
        productsLoading: false,
        category: selectedCategory,
      }));
    });
  }
</script>

{#if categories.length === 0 || loading}
  <select disabled>
    <option value="">Select Category</option>
  </select>
{:else}
  <select on:change={selectCategory}>
    <option value="">Select Category</option>
    {#each categories as category}
      <option value={category}
        >{category.charAt(0).toUpperCase() +
          category.slice(1).toLowerCase().split('_').join(' ')}</option
      >
    {/each}
  </select>
{/if}
