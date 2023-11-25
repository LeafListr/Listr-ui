<script lang="ts">
    import type { Product } from "../repository/types";

    export let product: Product;
</script>

<div class="product-card">
    <img
        height="64px"
        width="64px"
        src={product.images[0]}
        alt={product.name}
    />
    <h2>{product.name}</h2>
    <div class="terp-list">
        {#each product.terpenes || [] as terp}
            <p>{terp.name} - %{terp.value}</p>
        {/each}
    </div>
    <div class="cannabinoid-list">
        {#each product.cannabinoids || [] as cannabinoid}
            <p>{cannabinoid.name} - %{cannabinoid.value}</p>
        {/each}
    </div>
    <div class="variant-list">
        {#each product.variants || [] as variant}
            <p>
                {variant.name} - ${variant.price?.total ||
                    variant.price?.discountedTotal}
            </p>
        {/each}
    </div>
</div>

<style>
    .product-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
    }

    .product-card img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
    }
</style>
