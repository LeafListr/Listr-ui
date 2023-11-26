<script lang="ts">
    import { getDispensaryLocations } from "../repository/Dispensaries";
    import { dispensaryStore } from "../repository/store";
    import type { Location } from "../repository/types";

    let locations: Location[] = [];
    let selectedDispensaryLocation;

    dispensaryStore.subscribe(($dispensaryStore) => {
        selectedDispensaryLocation = $dispensaryStore.dispensary;
        if (selectedDispensaryLocation) {
            getDispensaryLocations(selectedDispensaryLocation).then(
                (locs: Location[]) => (locations = locs),
            );
        }
    });

    function changeLocation(event: Event) {
        const target = event.target as HTMLSelectElement;
        dispensaryStore.update((store) => ({
            ...store,
            location: target.value,
        }));
    }
</script>

{#if locations}
    <select on:change={changeLocation}>
        <option value="">Select Location</option>
        {#each locations as location}
            <option value={location.id}>{location.name}</option>
        {/each}
    </select>
{/if}
