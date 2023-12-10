<script lang="ts">
  import { dispensaryStore, productStore } from '../repository/store';
  import Accordion from './Accordion.svelte';
  import { filter } from '../filtering/filtering';

  let selectedDispensary: string;
  let selectedLocation: string;
  let selectedCategory: string;
  let selectedSubcategory: string;
  let selectedVariant: string;
  let maxPrice: number;
  let minPrice: number;

  let debounceTimeout: number;

  const debounceDelay = 750;

  dispensaryStore.subscribe($dispensaryStore => {
    selectedDispensary = $dispensaryStore.dispensary;
    selectedLocation = $dispensaryStore.location;
  });

  productStore.subscribe($productStore => {
    selectedCategory = $productStore.category;
  });

  function combinedFilter() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      productStore.update(store => ({
        ...store,
        products: [],
      }));
      filter(
        selectedDispensary,
        selectedLocation,
        selectedCategory,
        selectedVariant,
        selectedSubcategory,
        minPrice,
        maxPrice,
      ).then(foundProducts => {
        productStore.update(store => ({
          ...store,
          products: foundProducts,
        }));
      });
    }, debounceDelay);
  }

  function filterVariant(event: Event) {
    selectedVariant = (event.target as HTMLInputElement).value;
    combinedFilter();
  }

  function filterSubcategory(event: Event) {
    selectedSubcategory = (event.target as HTMLInputElement).value;
    combinedFilter();
  }

  function filterMinPrice(event: Event) {
    minPrice = Number((event.target as HTMLInputElement).value);
    combinedFilter();
  }

  function filterMaxPrice(event: Event) {
    maxPrice = Number((event.target as HTMLInputElement).value);
    combinedFilter();
  }
</script>

{#if selectedDispensary && selectedLocation && selectedCategory}
  <Accordion>
    <div slot="head">Filters</div>
    <div slot="details">
      <form>
        <label for="variant">Variants</label>
        <input
          type="text"
          id="variant"
          placeholder="1oz,1g"
          on:input={filterVariant}
        />
        <label for="subcategory">Subcategory</label>
        <input
          type="text"
          id="subcategory"
          placeholder="cartridges"
          on:input={filterSubcategory}
        />
        <label for="minPrice">Min Price</label>
        <input
          type="text"
          id="minPrice"
          placeholder="0"
          on:input={filterMinPrice}
        />
        <label for="maxPrice">Max Price</label>
        <input
          type="text"
          id="maxPrice"
          placeholder="100"
          on:input={filterMaxPrice}
        />
      </form>
    </div></Accordion
  >
{/if}
