<script lang="ts">
    import ProductCard from "./ProductCard.svelte";
    import type { Product } from "../repository/types";
    import { getProductsForCategory } from "../repository/Products";
    import { dispensaryStore } from "../repository/store";

    let products: Product[] = [];
    let loading = false;
    let selectedDispensary = "";
    let selectedLocation = "";
    let selectedCategory = "";

    let loadingProduct: Product = {
        id: "Loading Id...",
        name: "Loading Name...",
        category: "Loading Category...",
        images: ["loading.gif"],
        terpenes: [{ name: "Loading Terpenes...", value: 0, description: "" }],
        cannabinoids: [
            { name: "Loading Cannabinoids...", value: 0, description: "" },
        ],
        variants: [
            {
                name: "Loading Variants...",
                price: { total: 0, discountedTotal: 0 },
            },
        ],
    };

    dispensaryStore.subscribe(($dispensaryStore) => {
        selectedDispensary = $dispensaryStore.dispensary;
        selectedLocation = $dispensaryStore.location;
        selectedCategory = $dispensaryStore.category;
        if (selectedDispensary && selectedLocation && selectedCategory) {
            loading = true;
            getProductsForCategory(
                selectedDispensary,
                selectedLocation,
                selectedCategory,
            ).then((foundProducts) => {
                products = foundProducts;
                loading = false;
            });
        }
    });
</script>

{#if !selectedDispensary || !selectedLocation || !selectedCategory}
    <p> Please select a dispensary, location, and category :) </p>
{/if}

{#if loading}
    <div class="products-grid">
        {#each Array(50) as _, index (index)}
            <ProductCard product={loadingProduct} />
        {/each}
    </div>
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
