<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  import { dispensaryStore, productStore } from '../repository/store';
  import { loadingProduct } from './loadingProduct';
</script>

{#if !($dispensaryStore.dispensary && $dispensaryStore.location && $productStore.category)}
  <p>Please select a dispensary, location, and category :)</p>
{:else if !$productStore.products || $productStore.productsLoading}
  <div class="products-grid">
    {#each Array(50) as _, index (index)}
      <ProductCard product={loadingProduct} />
    {/each}
  </div>
{:else}
  <div class="products-grid">
    {#each $productStore.products as product}
      <ProductCard {product} />
    {/each}
  </div>
{/if}

<style>
  .products-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  }

  @media (min-width: 992px) {
    .products-grid {
      grid-template-columns: repeat(4, minmax(275px, 1fr));
    }
  }

  @media (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(3, minmax(275px, 1fr));
    }
  }

  @media (max-width: 600px) {
    .products-grid {
      grid-template-columns: repeat(2, minmax(275px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .products-grid {
      grid-template-columns: repeat(1, minmax(275px, 1fr));
    }
  }
</style>
