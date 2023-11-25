<script lang="ts">
    import {onMount} from 'svelte';

    import ProductCard from './ProductCard.svelte';
    import ProductCardSkelington from './ProductCardSkelington.svelte';
    import type {Product} from '../repository/types';
    import {getProducts} from '../repository/Products';

    export let dispensary: string;
    export let location: string;

    let products: Product[] = [];
    let loading = true;

    onMount(async () => {
        try {
            products = await getProducts(dispensary, location);
        } catch (error) {
            console.error('Failed to fetch products:', error);
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
            <ProductCard {product}/>
        {/each}
    </div>
{/if}

<style>
    .products-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(200px, 1fr));
        gap: 16px;
    }
</style>
