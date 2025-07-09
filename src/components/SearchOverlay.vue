<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/uiStore';
import { useProductStore } from '@/stores/productStore';

const uiStore = useUiStore();
const productStore = useProductStore();
const router = useRouter();

const searchQuery = ref('');

// Para la sección de "Populares", tomamos los primeros 4 productos
const popularProducts = computed(() => productStore.products.slice(0, 4));

function performSearch() {
  if (searchQuery.value.trim() === '') return;
  const query = searchQuery.value;
  uiStore.toggleSearch();
  router.push(`/search?q=${encodeURIComponent(query)}`);
}

function onResultClick() {
  uiStore.toggleSearch();
}

// Limpia el campo de búsqueda cuando se cierra el panel
watch(() => uiStore.isSearchOpen, (isOpen) => {
  if (!isOpen) {
    searchQuery.value = '';
  }
});
</script>

<template>
  <div class="search-wrapper" :class="{ 'is-open': uiStore.isSearchOpen }">
    <div class="search-backdrop" @click="uiStore.toggleSearch()"></div>

    <div class="search-panel">
      <div class="search-header">
        <div class="input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            class="search-input"
            v-model="searchQuery"
            placeholder="Buscar aquí..."
            @keydown.enter="performSearch"
          />
        </div>
        <button @click="uiStore.toggleSearch()" class="cancel-button">CANCELAR</button>
      </div>

      <div class="search-body">
        <h3>PRODUCTOS POPULARES</h3>
        <div class="popular-products-grid">
          <router-link
            v-for="product in popularProducts"
            :key="product.id"
            :to="`/producto/${product.id}`"
            class="popular-product-card"
            @click="onResultClick"
          >
            <img :src="product.imageUrl" :alt="product.name" />
            <div class="product-info">
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">₡{{ product.price.toLocaleString('es-CR') }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  
  /* Oculto por defecto */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.search-wrapper.is-open {
  opacity: 1;
  visibility: visible;
}

.search-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.search-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  /* Animación de despliegue */
  transform: translateY(-100%);
  transition: transform 0.4s ease-in-out;
}
.search-wrapper.is-open .search-panel {
  transform: translateY(0);
}

.search-header {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
}

.input-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0 1rem;
}

.search-icon {
  color: #888;
  margin-right: 0.75rem;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0.8rem 0;
  font-size: 1rem;
  outline: none;
}

.cancel-button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  margin-left: 1.5rem;
  letter-spacing: 0.5px;
}

.search-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-body h3 {
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.9rem;
}

.popular-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.popular-product-card {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}
.popular-product-card:hover {
  opacity: 0.8;
}

.popular-product-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.product-info {
  text-align: left;
}
.product-name {
  font-weight: 500;
  font-size: 0.9rem;
}
.product-price {
  font-size: 0.9rem;
  color: #555;
}

/* --- ESTILOS RESPONSIVOS --- */
@media (max-width: 768px) {
  /* En móvil, el panel ocupa toda la pantalla para una mejor experiencia */
  .search-panel {
    height: 100vh;
    overflow-y: auto;
  }
  .search-header, .search-body {
    padding: 1rem;
  }
  .popular-products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>