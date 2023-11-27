<script lang="ts">
    import { dispensaryStore } from "../repository/store";
    import CategoriesSelect from "./CategoriesSelect.svelte";
    import DispensarySelect from "./DispensarySelect.svelte";
    import LocationSelect from "./LocationSelect.svelte";

    let dispensary: string = "";

    dispensaryStore.subscribe(($dispensaryStore) => {
        let selectedDispensary = $dispensaryStore.dispensary;
        if (selectedDispensary) {
            dispensary = selectedDispensary;
        }
    });
</script>

<nav>
    <h2 class="dispensary-name">Now Viewing: {dispensary}</h2>
    <DispensarySelect /> <br />
    <LocationSelect /> <br />
    <CategoriesSelect />
</nav>

<style>
    nav {
        margin-bottom: 7px;
        padding-bottom: 7px;
    }
</style>
