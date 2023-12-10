<script lang="ts">
  import type { Product } from '../repository/types';

  export let product: Product;
</script>

<div class="product-card">
  <div class="product-headline">
    <img src={product.images[0]} alt={product.name} />
    <h4 class="product-name">{product.brand}: {product.name}</h4>
  </div>
  <div class="product-subcategory">
    <label for="subcategory">Subcategory</label>
    <p id="subcategory">
      {product.subcategory}
    </p>
  </div>
  <div class="product-variants">
    <label for="variant">Variant</label>
    <p id="variant">
      {product.variant} / ${product.price?.total ||
        product.price?.discountedTotal}
    </p>
  </div>
  <div class="product-cannabinoids">
    {#each product.cannabinoids || [] as cannabinoid}
      <p>{cannabinoid.name} - {cannabinoid.value}%</p>
    {/each}
  </div>
  <div class="product-terpenes">
    {#each product.terpenes || [] as terp}
      <p>{terp.name} - {terp.value}%</p>
    {/each}
  </div>
</div>

<style>
  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-auto-rows: minmax(min-content, max-content);
    grid-template-areas:
      'headline headline'
      'subcategory variant'
      'cannabinoids cannabinoids'
      'terpenes terpenes';
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    align-items: center;
  }

  .product-card img {
    grid-area: image;
    width: 64px;
    height: 64px;
    border-radius: 4px;
  }

  .product-card .product-headline {
    grid-area: headline;
    grid-template-areas: 'image name';
    display: grid;
  }

  .product-card .product-name {
    grid-area: name;
    margin: 0 0 0 10px;
  }

  .product-card .product-cannabinoids {
    grid-area: cannabinoids;
    display: grid;
    grid-gap: 10px;
    margin: 6px 4px 0 0;
    font-size: 10px;
  }

  .product-card .product-terpenes {
    grid-area: terpenes;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    margin: 6px 4px 0 0;
    font-size: 10px;
  }

  .product-card .product-variants {
    grid-area: variant;
    padding: 12px 0;
  }

  label {
    font-size: 12px;
    font-weight: bold;
  }
</style>
