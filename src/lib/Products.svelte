<script lang="ts">
    import { onMount } from "svelte";

    import ProductCard from "./ProductCard.svelte";
    import ProductCardSkelington from "./ProductCardSkelington.svelte";
    import type { Product } from "../repository/types";
    import { getProducts } from "../repository/Products";

    export let dispensary: string;
    export let location: string;

    let products: Product[] = [];
    let loading = true;

    onMount(async () => {
        try {
            products = await getProducts(dispensary, location);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <div class="products-grid">
        {#each Array(50) as _, index (index)}
            <ProductCardSkelington />
        {/each}
    </div>
{:else if products.length === 0}
    <p>No products found.</p>
{:else}
    <div class="products-grid">
        {#each products as product}
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

    /* Example media queries for different breakpoints */

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) {
        .products-grid {
            grid-template-columns: repeat(4, minmax(275px, 1fr));
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .products-grid {
            grid-template-columns: repeat(3, minmax(275px, 1fr));
        }
    }

    /* Small devices (phones, 600px and down) */
    @media (max-width: 600px) {
        .products-grid {
            grid-template-columns: repeat(2, minmax(275px, 1fr));
        }
    }

    /* Extra small devices (phones, 480px and down) */
    @media (max-width: 480px) {
        .products-grid {
            grid-template-columns: repeat(1, minmax(275px, 1fr));
        }
    }
</style>
