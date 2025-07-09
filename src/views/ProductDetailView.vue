<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const productId = parseInt(route.params.id);
const product = computed(() => productStore.getProductById(productId));

// --- FUNCIÓN DE ANIMACIÓN DEFINITIVA ---
function addProductToCart(product, event) {
  cartStore.addItem(product);

  const imageContainer = event.target.closest('.product-detail-container');
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
    clone.style.opacity = '0.5';
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 1000);
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

      <button @click="addProductToCart(product, $event)" class="add-to-cart-main-button">
        AÑADIR AL CARRITO
      </button>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Producto no encontrado</h2>
    <router-link to="/productos">Volver a productos</router-link>
  </div>
</template>

<style scoped>
/* Tus estilos no necesitan cambios */
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
@media (max-width: 992px) { .product-detail-container { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem; } .product-gallery { grid-row: 1; } .product-info { text-align: center; } .breadcrumbs { justify-content: center; } .material-selection { display: flex; flex-direction: column; align-items: center; } .add-to-cart-main-button { max-width: 400px; margin: 0 auto; } }
@media (max-width: 480px) { .product-info h1 { font-size: 2rem; } .price { font-size: 1.6rem; } .product-detail-container { padding: 1rem; } }
</style>