import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isSearchOpen = ref(false);

  function toggleSearch() {
    isSearchOpen.value = !isSearchOpen.value;
  }

  return { isSearchOpen, toggleSearch };
});