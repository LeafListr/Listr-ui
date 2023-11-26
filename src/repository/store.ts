import { writable } from "svelte/store";

export const dispensaryStore = writable({
  dispensary: "",
  location: "",
  category: "",
});
