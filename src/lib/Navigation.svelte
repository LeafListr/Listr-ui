<script lang="ts">
  import CategoriesSelect from './CategoriesSelect.svelte';
  import DispensarySelect from './DispensarySelect.svelte';
  import LocationSelect from './LocationSelect.svelte';
  import MenuTypeToggler from './components/MenuTypeToggler.svelte';
</script>

<nav>
  <MenuTypeToggler />
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
