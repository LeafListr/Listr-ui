<script>
  export let open = false;
  import { slide } from 'svelte/transition';
  const handleClick = () => (open = !open);
</script>

<div class="accordion">
  <div class="header">
    <div class="nav">
      <button on:click={handleClick}>
        <slot name="head" />
      </button>
    </div>
  </div>

  {#if open}
    <div class="details" transition:slide>
      <slot name="details" />
    </div>
  {/if}
</div>

<style>
  div.accordion {
    margin: 1rem 0;
  }

  div.header {
    display: flex;
    width: 100%;
  }

  div.header .nav {
    flex: 1;
    margin-bottom: 7px;
  }

  div.details {
    background-color: #1d1d20;
    border-radius: 60px;
    padding: 1rem;
  }
</style>
