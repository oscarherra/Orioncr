<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Para manejar la URL
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

// --- LÓGICA DE PAGINACIÓN CON MEMORIA EN URL ---
const itemsPerPage = 16; // Se mantiene tu cambio de 16 por página

// El estado inicial se lee desde la URL (?page=X), si no existe, es 1
const currentPage = ref(parseInt(route.query.page) || 1);

const totalPages = computed(() => Math.ceil(productStore.products.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return productStore.products.slice(startIndex, endIndex);
});

// Las funciones de navegación solo cambian el número
function nextPage() { 
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
function prevPage() { 
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Este 'watch' actualiza la URL cada vez que currentPage cambia
watch(currentPage, (newPage) => {
  router.push({ query: { page: newPage } });
  window.scrollTo(0, 0); // Opcional: lleva al usuario arriba de la página
});


// --- FUNCIÓN DE ANIMACIÓN ---
function addProductToCart(product, event) {
  cartStore.addItem(product);

  const imageContainer = event.target.closest('.product-image-container');
  if (!imageContainer) return;
  const originalImage = imageContainer.querySelector('img');
  if (!originalImage) return;
  const cartIcon = document.querySelector('.cart-icon-button');
  if (!cartIcon) return;

  const imageRect = originalImage.getBoundingClientRect();
  const clone = originalImage.cloneNode(true);
  
  clone.style.position = 'fixed';
  clone.style.left = imageRect.left + 'px';
  clone.style.top = imageRect.top + 'px';
  clone.style.width = imageRect.width + 'px';
  clone.style.height = imageRect.height + 'px';
  clone.style.margin = '0';
  clone.style.zIndex = '9999';
  clone.style.borderRadius = '50%';
  clone.style.transition = 'all 1s cubic-bezier(0.55, 0, 1, 0.45)';

  document.body.appendChild(clone);

  const cartRect = cartIcon.getBoundingClientRect();
  setTimeout(() => {
    clone.style.left = (cartRect.left + 10) + 'px';
    clone.style.top = (cartRect.top + 10) + 'px';
    clone.style.width = '0px';
    clone.style.height = '0px';
    clone.style.opacity = '0';
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 1000);
}
</script>

<template>
  <div class="product-section">
    <h2>Nuestros Pines</h2>
    <div class="product-grid">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <router-link :to="`/producto/${product.id}`" class="product-link">
          <div class="product-image-container">
            <img :src="product.imageUrl" :alt="product.name" />
            <button @click.stop.prevent="addProductToCart(product, $event)" class="add-to-cart-button">+</button>
          </div>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">
            <span v-if="product.salePrice" class="sale-price">
              ₡{{ product.salePrice.toLocaleString('es-CR') }}
            </span>
            <span class="original-price" :class="{ 'on-sale': product.salePrice }">
              ₡{{ product.price.toLocaleString('es-CR') }}
            </span>
          </p>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <span>{{ currentPage }} DE {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
    </div>
  </div>
</template>

<style scoped>
.product-section { max-width: 1400px; margin: 2rem auto; padding: 0 2rem; }
.product-section h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; font-weight: 800; letter-spacing: 1px; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 3rem 2rem; }
.product-card { text-align: left; }
.product-link { text-decoration: none; color: inherit; display: block; transition: opacity 0.2s ease-in-out; }
.product-link:hover { opacity: 0.8; }
.product-image-container { position: relative; background-color: #f5f5f5; border-radius: 8px; margin-bottom: 1rem; overflow: hidden; aspect-ratio: 1 / 1; }
.product-image-container img { width: 100%; height: 100%; object-fit: cover; }
.add-to-cart-button { position: absolute; bottom: 15px; right: 15px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 50%; width: 36px; height: 36px; font-size: 22px; font-weight: 400; cursor: pointer; opacity: 0; transform: translateY(10px); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; }
.product-card:hover .add-to-cart-button { opacity: 1; transform: translateY(0); }
.product-name { font-size: 0.95rem; font-weight: 500; margin-bottom: 0.4rem; }
.product-price { font-size: 1rem; color: #333; }
.sale-price { font-weight: 700; color: #000000; margin-right: 0.5rem; }
.original-price.on-sale { text-decoration: line-through; color: #888; }
.pagination { margin-top: 4rem; display: flex; justify-content: center; align-items: center; gap: 1rem; font-size: 0.9rem; }
.pagination button { background: none; border: 1px solid #ccc; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; transition: background-color 0.2s, border-color 0.2s; }
.pagination button:hover:not(:disabled) { background-color: #f5f5f5; border-color: #999; }
.pagination button:disabled { color: #ccc; cursor: not-allowed; }
</style>