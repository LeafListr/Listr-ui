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
                (locs: Location[]) => {
                    const sortedLocations = locs.sort((a, b) => {
                        if (!a.name || !b.name) {
                            return 0;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });
                    locations = sortedLocations;
                },
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

<select on:change={changeLocation}>
    <option value="">Select Location</option>
    {#each locations as location}
        <option value={location.id}>{location.name}</option>
    {/each}
</select>
