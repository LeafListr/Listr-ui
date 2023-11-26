<script lang="ts">
    import { getCategories } from "../repository/Categories";
    import type { Category } from "../repository/types";
    import { dispensaryStore } from "../repository/store";

    let categories: Category[] = [];
    let selectedCategory: string;
    let selectedDispensary: string;
    let selectedLocation: string;

    dispensaryStore.subscribe(($dispensaryStore) => {
        selectedDispensary = $dispensaryStore.dispensary;
        selectedLocation = $dispensaryStore.location;
        if (selectedLocation && selectedDispensary) {
            selectedCategory = '';
            loadCategories();
        }
    });

    async function loadCategories() {
        categories = await getCategories(selectedDispensary, selectedLocation);
    }
    function selectCategory(event: Event) {
        const target = event.target as HTMLSelectElement;
        selectedCategory = target.value;
        dispensaryStore.update((store) => ({
            ...store,
            category: selectedCategory,
        }));
    }
</script>

<select on:change={selectCategory}>
    <option value="">Select Category</option>
    {#each categories as category}
        <option value={category}
            >{category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase().split("_").join(" ")}</option
        >
    {/each}
</select>
