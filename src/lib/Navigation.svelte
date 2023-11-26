<script>
    import { dispensaryStore } from "../repository/store";

    let dispensary = "Please select a dispensary...";

    dispensaryStore.subscribe(($dispensaryStore) => {
        let selectedDispensary = $dispensaryStore.dispensary;
        if (selectedDispensary) {
            dispensary = selectedDispensary;
        }
    });
</script>

<nav>
    <h1 class="dispensary-name">{dispensary}</h1>
</nav>

<style>
</style>
