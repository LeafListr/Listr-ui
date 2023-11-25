<script>
  let offers = ['better pizza', 'better ingredients'];
</script>

<div class="offers">
  <h2>Today's Offers</h2>
  <ul>
    {#each offers as deal}
      <li>{deal}</li>
    {/each}
  </ul>
</div>

<style>
  .offers {
    /* Add your styles here */
  }
</style>
