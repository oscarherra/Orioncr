<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const productId = parseInt(route.params.id);
const product = computed(() => productStore.getProductById(productId));

useHead({
  title: computed(() => {
    return product.value ? `${product.value.name} | Orión.cr` : 'Producto no encontrado';
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        return product.value ? `Compra el pin de ${product.value.name} en Orión.cr. Diseños exclusivos y envíos a toda Costa Rica.` : 'Pin no disponible.';
      }),
    },
  ],
});


// --- FUNCIÓN DE ANIMACIÓN ---
function addProductToCart(product) {
  // MODIFICADO: Añadimos la verificación de producto agotado
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
  <div v-if="product" class="product-detail-container">
    <div class="product-gallery">
      <img :src="product.imageUrl" :alt="product.name" class="main-product-image">
    </div>
    <div class="product-info">
      <p class="breadcrumbs">Inicio • Productos • {{ product.name }}</p>
      <h1>{{ product.name }}</h1>
      <span class="vendor">GALLO PIN</span>
      <p class="price">₡{{ (product.salePrice || product.price).toLocaleString('es-CR') }}</p>
      
      <div class="material-selection">
        <label>MATERIAL</label>
        <button class="material-button selected">PIN</button>
      </div>

      <button 
        @click="addProductToCart(product)" 
        :disabled="product.soldOut" 
        class="add-to-cart-main-button"
      >
        <span v-if="product.soldOut">AGOTADO</span>
        <span v-else>AÑADIR AL CARRITO</span>
      </button>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Producto no encontrado</h2>
    <router-link to="/productos">Volver a productos</router-link>
  </div>
</template>

<style scoped>
/* Tus estilos no cambian */
.product-detail-container { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 2rem auto; padding: 2rem; }
.product-gallery { display: flex; justify-content: center; }
.main-product-image { max-width: 100%; border-radius: 8px; }
.product-info h1 { font-size: 2.5rem; margin: 0.5rem 0; }
.breadcrumbs, .vendor { text-transform: uppercase; font-size: 0.8rem; color: #666; }
.vendor { margin-bottom: 1.5rem; }
.price { font-size: 1.8rem; margin-bottom: 2rem; }
.material-selection { margin-bottom: 2rem; }
.material-selection label { display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: #666; }
.material-button { padding: 10px 20px; border: 1px solid #ccc; background: #fff; cursor: pointer; }
.material-button.selected { border-color: #000; background-color: #000; color: #fff; }
.add-to-cart-main-button { width: 100%; padding: 1rem; background-color: #333; color: #fff; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background-color 0.2s; }
.add-to-cart-main-button:hover { background-color: #000; }
.not-found { text-align: center; padding: 5rem; }

/* MODIFICADO: Añadimos el estilo para el botón deshabilitado */
.add-to-cart-main-button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

@media (max-width: 992px) { .product-detail-container { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem; } .product-gallery { grid-row: 1; } .product-info { text-align: center; } .breadcrumbs { justify-content: center; } .material-selection { display: flex; flex-direction: column; align-items: center; } .add-to-cart-main-button { max-width: 400px; margin: 0 auto; } }
@media (max-width: 480px) { .product-info h1 { font-size: 2rem; } .price { font-size: 1.6rem; } .product-detail-container { padding: 1rem; } }
</style>