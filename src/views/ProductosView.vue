<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const itemsPerPage = 16;
const currentPage = ref(parseInt(route.query.page) || 1);

const category = computed(() => route.query.category);

const filteredProducts = computed(() => {
  if (category.value) {
    return productStore.products.filter(p => p.category === category.value);
  }
  return productStore.products;
});

const pageTitle = computed(() => {
  if (category.value) {
    return category.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return 'Nuestros Pines';
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProducts.value.slice(startIndex, endIndex);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

watch(currentPage, (newPage) => {
  router.push({ query: { ...route.query, page: newPage } });
  window.scrollTo(0, 0);
});

watch(category, () => {
  currentPage.value = 1;
});

function addProductToCart(product) {
  // Verificación para no agregar productos agotados
  if (product.soldOut) return;

  cartStore.addItem(product);
  const cartIcon = document.querySelector('.cart-icon-button');
  if (cartIcon) {
    cartIcon.classList.add('pop-cart');
    setTimeout(() => {
      cartIcon.classList.remove('pop-cart');
    }, 400);
  }
}
</script>

<template>
  <div class="product-section">
    <h2>{{ pageTitle }}</h2>
    <div class="product-grid">
      <div v-if="paginatedProducts.length === 0" class="no-products">
        <p>No se encontraron productos en esta colección.</p>
        <router-link to="/colecciones" class="back-link">Volver a Colecciones</router-link>
      </div>

      <div v-else v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <router-link :to="`/producto/${product.id}`" class="product-link">
          <div class="product-image-container">
            <img :src="product.imageUrl" :alt="product.name" />

            <div v-if="product.soldOut" class="sold-out-overlay">
              <span>Agotado</span>
            </div>

            <button
              @click.stop.prevent="addProductToCart(product)"
              :disabled="product.soldOut"
              class="add-to-cart-button">
              +
            </button>
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

    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <span>{{ currentPage }} DE {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
    </div>
  </div>
</template>

<style scoped>
.product-section { max-width: 1400px; margin: 2rem auto; padding: 0 2rem; }
.product-section h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; font-weight: 800; letter-spacing: 1px; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 3rem 2rem; min-height: 40vh; }
.product-card { text-align: left; }
.product-link { text-decoration: none; color: inherit; display: block; transition: opacity 0.2s ease-in-out; }
.product-link:hover { opacity: 0.8; }
.product-image-container { position: relative; background-color: #f5f5f5; border-radius: 8px; margin-bottom: 1rem; overflow: hidden; aspect-ratio: 1 / 1; }
.product-image-container img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s; }

/* Capa y estilos para productos agotados */
.sold-out-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.sold-out-overlay span {
  background-color: #000;
  color: #fff;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}
.product-card:has(.sold-out-overlay) img {
  opacity: 0.6;
}

.add-to-cart-button { 
  position: absolute; 
  bottom: 15px; 
  right: 15px; 
  background-color: #ffffff; 
  border: 1px solid #e0e0e0; 
  border-radius: 50%; 
  width: 36px; 
  height: 36px; 
  font-size: 22px; 
  font-weight: 400; 
  cursor: pointer; 
  opacity: 0; 
  transform: translateY(10px); 
  transition: all 0.3s ease; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 3;
}
.product-card:hover .add-to-cart-button { opacity: 1; transform: translateY(0); }
.add-to-cart-button:disabled { background-color: #e0e0e0; cursor: not-allowed; }
.product-card:hover .add-to-cart-button:disabled {
  opacity: 0.5; /* Mantiene la opacidad al hacer hover en un producto agotado */
  transform: translateY(10px); /* Evita que el botón se mueva al hacer hover */
}


.product-name { font-size: 0.95rem; font-weight: 500; margin-bottom: 0.4rem; }
.product-price { font-size: 1rem; color: #333; }
.sale-price { font-weight: 700; color: #000000; margin-right: 0.5rem; }
.original-price.on-sale { text-decoration: line-through; color: #888; }
.pagination { margin-top: 4rem; display: flex; justify-content: center; align-items: center; gap: 1rem; font-size: 0.9rem; }
.pagination button { background: none; border: 1px solid #ccc; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; transition: background-color 0.2s, border-color 0.2s; }
.pagination button:hover:not(:disabled) { background-color: #f5f5f5; border-color: #999; }
.pagination button:disabled { color: #ccc; cursor: not-allowed; }
.no-products { grid-column: 1 / -1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; color: #777; }
.back-link { margin-top: 1rem; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 50px; font-weight: 500; }

@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem 1rem; }
  .product-section { padding: 0 1rem; }
}
</style>