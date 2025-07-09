<script setup>
import { useCartStore } from '@/stores/cartStore';

// Obtenemos acceso a nuestro store
const cartStore = useCartStore();
</script>

<template>
  <div v-if="cartStore.isOpen" @click="cartStore.toggleCart()" class="cart-overlay"></div>

  <aside class="cart-drawer" :class="{ 'is-open': cartStore.isOpen }">
    <div class="cart-header">
      <h3>SU CARRITO</h3>
      <button @click="cartStore.toggleCart()" class="close-button">&times;</button>
    </div>

    <div class="cart-content">
      <div v-if="cartStore.isEmpty" class="cart-empty">
        <p>Su carrito está vacío.</p>
        <a href="#" @click.prevent="cartStore.toggleCart()">Haga clic aquí para seguir comprando.</a>
      </div>
      
      <ul v-else class="cart-items">
        <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-image" />
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">${{ (item.salePrice || item.price).toFixed(2) }}</span>
          </div>
          <button @click="cartStore.removeItem(item.id)" class="remove-item-button">&times;</button>
        </li>
      </ul>
    </div>

    <div v-if="!cartStore.isEmpty" class="cart-footer">
        <div class="cart-total">
            <span>Subtotal</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="checkout-button">FINALIZAR COMPRA</button>
    </div>
  </aside>
</template>

<style scoped>
/* Estilos para el overlay oscuro de fondo */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.3s ease;
}

/* Estilos para el panel deslizable */
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  box-shadow: -5px 0 15px rgba(0,0,0,0.15);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
}

.cart-drawer.is-open {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.cart-header h3 {
  margin: 0;
  font-weight: 700;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
}

.cart-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.cart-empty {
  text-align: center;
  padding-top: 4rem;
}
.cart-empty a {
    color: #000;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
}

.item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
}

.item-price {
  color: #555;
}

.remove-item-button {
  background: #f1f1f1;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e5e5;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.checkout-button {
    width: 100%;
    padding: 1rem;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
}
</style>