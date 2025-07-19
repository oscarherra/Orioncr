<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/uiStore';
import { useProductStore } from '@/stores/productStore';

const uiStore = useUiStore();
const productStore = useProductStore();
const router = useRouter();

const searchQuery = ref('');
// 1. Los resultados ahora se guardan en un 'ref' en lugar de un 'computed'
const searchResults = ref([]);
// 2. Necesitamos una variable para nuestro temporizador de debounce
let debounceTimer = null;

// Cuando no hay búsqueda, muestra los primeros 4 productos como populares
const popularProducts = ref(productStore.products.slice(0, 4));

// 3. Usamos 'watch' para "observar" cuando el usuario escribe en la barra de búsqueda
watch(searchQuery, (newQuery) => {
  // Cancela el temporizador anterior cada vez que se presiona una tecla
  clearTimeout(debounceTimer);

  // Si el campo está casi vacío, limpia los resultados y no hagas nada más
  if (newQuery.length < 2) {
    searchResults.value = [];
    return;
  }

  // Inicia un nuevo temporizador. La búsqueda solo se ejecutará si el usuario
  // deja de escribir por 300 milisegundos.
  debounceTimer = setTimeout(() => {
    searchResults.value = productStore.products.filter(product =>
      product.name.toLowerCase().includes(newQuery.toLowerCase())
    );
  }, 300); // 300ms de espera
});


// (El resto de las funciones no cambian)
function performSearch() {
  if (searchQuery.value.trim() === '') return;
  const query = searchQuery.value;
  uiStore.toggleSearch();
  router.push(`/search?q=${encodeURIComponent(query)}`);
}

function onNavigate() {
  uiStore.toggleSearch();
}
</script>

<template>
  <div class="search-wrapper" :class="{ 'is-open': uiStore.isSearchOpen }">
    <div class="search-backdrop" @click="uiStore.toggleSearch()"></div>
    <div class="search-panel">
      <div class="search-header">
        <div class="input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            class="search-input"
            v-model="searchQuery"
            placeholder="Buscar aquí..."
            @keydown.enter="performSearch"
            autofocus
          />
        </div>
        <button @click="uiStore.toggleSearch()" class="cancel-button">CANCELAR</button>
      </div>

      <div class="search-body">
        <div v-if="searchQuery.length < 2">
          <h3>PRODUCTOS POPULARES</h3>
          <div class="results-grid">
            <router-link
              v-for="product in popularProducts"
              :key="product.id"
              :to="`/producto/${product.id}`"
              class="product-card"
              @click="onNavigate"
            >
              <div class="image-container">
                <img :src="product.imageUrl" :alt="product.name" />
                <span v-if="product.salePrice" class="tag sale">REBAJAS</span>
                <span v-if="product.isSoldOut" class="tag sold-out">AGOTADO</span>
              </div>
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">₡{{ product.price.toLocaleString('es-CR') }}</p>
            </router-link>
          </div>
        </div>

        <div v-else>
          <h3>PRODUCTOS</h3>
          <div v-if="searchResults.length > 0" class="results-grid">
             <router-link
              v-for="product in searchResults"
              :key="product.id"
              :to="`/producto/${product.id}`"
              class="product-card"
              @click="onNavigate"
            >
              <div class="image-container">
                <img :src="product.imageUrl" :alt="product.name" />
                <span v-if="product.salePrice" class="tag sale">REBAJAS</span>
                <span v-if="product.isSoldOut" class="tag sold-out">AGOTADO</span>
              </div>
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">₡{{ product.price.toLocaleString('es-CR') }}</p>
            </router-link>
          </div>
          <p v-else class="no-results">No se encontraron productos para "{{ searchQuery }}"</p>
          
          <div class="view-all-container">
            <router-link :to="`/search?q=${searchQuery}`" class="view-all-button" @click="onNavigate">
              VER TODO →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tus estilos no necesitan cambios, se mantienen igual */
.search-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1999; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
.search-wrapper.is-open { opacity: 1; visibility: visible; }
.search-backdrop { position: absolute; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); }
.search-panel { position: absolute; top: 0; left: 0; width: 100%; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-100%); transition: transform 0.4s ease-in-out; }
.search-wrapper.is-open .search-panel { transform: translateY(0); }
.search-header { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; padding: 1.5rem 2rem; }
.input-wrapper { flex-grow: 1; display: flex; align-items: center; background-color: #f5f5f5; border-radius: 8px; padding: 0 1rem; }
.search-icon { color: #888; margin-right: 0.75rem; width:20px; height:20px; stroke-width:2; fill:none; stroke:currentColor; stroke-linecap:round; stroke-linejoin:round; }
.search-input { width: 100%; border: none; background: transparent; padding: 0.8rem 0; font-size: 1rem; outline: none; }
.cancel-button { background: none; border: none; cursor: pointer; font-weight: 500; color: #555; margin-left: 1.5rem; letter-spacing: 0.5px; }
.search-body { max-width: 1200px; margin: 0 auto; padding: 2rem; overflow-y: auto; max-height: 70vh; }
.search-body h3 { font-weight: 700; letter-spacing: 1px; margin-bottom: 1.5rem; color: #888; font-size: 0.9rem; }
.no-results { text-align: center; padding: 2rem; color: #777; }
.results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5rem; }
.product-card { text-decoration: none; color: inherit; }
.image-container { position: relative; width: 100%; aspect-ratio: 1 / 1; background-color: #f5f5f5; border-radius: 8px; margin-bottom: 0.5rem; overflow: hidden; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }
.product-name { font-weight: 500; font-size: 0.9rem; }
.product-price { font-size: 0.9rem; color: #555; }
.tag { position: absolute; top: 10px; left: 10px; padding: 4px 8px; font-size: 0.7rem; font-weight: 700; color: #fff; border-radius: 4px; text-transform: uppercase; }
.tag.sale { background-color: #c92a2a; }
.tag.sold-out { background-color: #868e96; }
.view-all-container { text-align: right; margin-top: 2rem; }
.view-all-button { text-decoration: none; color: #333; font-weight: 600; border: 2px solid #333; padding: 8px 16px; border-radius: 50px; transition: all 0.2s ease; }
.view-all-button:hover { background-color: #333; color: #fff; }
@media (max-width: 768px) { .search-panel { height: 100vh; } .search-header, .search-body { padding: 1rem; } .results-grid { grid-template-columns: repeat(2, 1fr); } }
</style>