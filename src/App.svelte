<script lang="ts">
    import CategoriesSelect from "./lib/CategoriesSelect.svelte";
    import DispensarySelect from "./lib/DispensarySelect.svelte";
    import LocationSelect from "./lib/LocationSelect.svelte";
    import Navigation from "./lib/Navigation.svelte";
    import Products from "./lib/Products.svelte";
</script>

<main>
    <Navigation />
    <DispensarySelect />
    <LocationSelect />
    <CategoriesSelect />
    <Products />
</main>

<style></style>
