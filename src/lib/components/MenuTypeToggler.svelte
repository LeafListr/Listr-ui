<script lang="ts">
  import { dispensaryStore } from '../../repository/store';

  function handleCheck(e: Event) {
    dispensaryStore.update(store => ({
      ...store,
      isRecreational: (e.target as HTMLInputElement).checked,
      location: '',
      dispensary: '',
    }));
  }
</script>

<div class="toggle-switch">
  <input type="checkbox" id="med-rec-toggle" on:change={handleCheck} />
  <label for="med-rec-toggle" class="switch-label">
    <span class="toggle-text">Recreational</span>
    <span class="switch-handle"></span>
    <span class="toggle-text">Medical</span>
  </label>
</div>

<style>
  .toggle-switch {
    display: inline-block;
    position: relative;
  }

  #med-rec-toggle {
    display: none;
  }

  .switch-label {
    display: block;
    cursor: pointer;
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
  }

  .switch-handle {
    display: block;
    background-color: #242424;
    position: absolute;
    border-radius: 20px;
    top: 2px;
    left: 2px;
    right: 50%;
    bottom: 2px;
    transition: all 0.3s ease;
  }

  #med-rec-toggle:checked + .switch-label .switch-handle {
    right: 2px;
    left: 50%;
  }

  .toggle-text {
    line-height: 30px;
    padding: 0 20px;
    display: inline-block;
    width: 100px;
    color: #000;
    font-weight: bold;
  }

  .switch-label {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>
