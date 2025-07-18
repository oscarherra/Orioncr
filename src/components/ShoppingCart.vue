<script setup>
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

function sendOrderToWhatsApp() {
  if (!cartStore.selectedShippingOptionId) {
    alert('Por favor, selecciona un método de envío antes de continuar.');
    return;
  }
  const phoneNumber = '50685216703';
  let message = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
  cartStore.items.forEach(item => {
    const price = item.salePrice || item.price;
    message += `*${item.name}*\n`;
    message += `  - Cantidad: ${item.quantity}\n`;
    message += `  - Precio: ₡${price.toLocaleString('es-CR')}\n\n`;
  });
  const selectedOption = cartStore.shippingOptions.find(o => o.id === cartStore.selectedShippingOptionId);
  message += `*Subtotal: ₡${cartStore.subtotal.toLocaleString('es-CR')}*\n`;
  message += `*Envío (${selectedOption.name}): ₡${cartStore.selectedShippingCost.toLocaleString('es-CR')}*\n`;
  message += `*Total Final: ₡${cartStore.totalPrice.toLocaleString('es-CR')} CRC*\n\n`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}
</script>

<template>
  <div v-if="cartStore.isOpen" @click="cartStore.toggleCart()" class="cart-overlay"></div>
  <aside class="cart-drawer" :class="{ 'is-open': cartStore.isOpen }">
    <div class="cart-header">
      <h3>Tu carrito</h3>
      <button @click="cartStore.toggleCart()" class="close-button">Seguir comprando</button>
    </div>
    
    <div class="cart-content">
      <div v-if="cartStore.isEmpty" class="cart-empty">
        <p>Su carrito está vacío.</p>
        <router-link to="/productos" @click="cartStore.toggleCart()">Ver nuestros productos</router-link>
      </div>
      <ul v-else class="cart-items-detailed">
        <li v-for="item in cartStore.items" :key="item.id" class="cart-item-detailed">
          <img :src="item.imageUrl" :alt="item.name" class="item-image">
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">₡{{ (item.salePrice || item.price).toLocaleString('es-CR') }}</span>
          </div>
          <div class="item-quantity">
            <button @click="cartStore.decreaseItemQuantity(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.increaseItemQuantity(item.id)">+</button>
          </div>
          <button @click="cartStore.removeItem(item.id)" class="remove-item-button" aria-label="Eliminar ítem">
            &times;
          </button>
        </li>
      </ul>
    </div>

    <div v-if="!cartStore.isEmpty" class="cart-footer-detailed">
      <div class="shipping-options">
        <h4>Selecciona el tipo de envío</h4>
        <div v-for="option in cartStore.shippingOptions" :key="option.id" class="shipping-option">
          <input 
            type="radio" 
            :id="`shipping-${option.id}`" 
            :value="option.id"
            :checked="cartStore.selectedShippingOptionId === option.id"
            @change="cartStore.selectShippingOption(option.id)"
            name="shipping"
          >
          <label :for="`shipping-${option.id}`">
            <span class="option-name">{{ option.name }}</span>
            <span class="option-price">+ ₡{{ option.price.toLocaleString('es-CR') }}</span>
          </label>
        </div>
      </div>
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₡{{ cartStore.subtotal.toLocaleString('es-CR') }}</span>
        </div>
        <div class="summary-row">
          <span>Envío</span>
          <span>₡{{ cartStore.selectedShippingCost.toLocaleString('es-CR') }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₡{{ cartStore.totalPrice.toLocaleString('es-CR') }}</span>
        </div>
      </div>
      <button 
        @click="sendOrderToWhatsApp" 
        class="checkout-button-detailed"
        :disabled="!cartStore.selectedShippingOptionId"
      >
        Pagar pedido (Enviar por WhatsApp)
      </button>
    </div>
  </aside>
</template>

<style scoped>
.cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; }

/* Contenedor Principal */
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  box-shadow: -5px 0 15px rgba(0,0,0,0.15);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
}
.cart-drawer.is-open { transform: translateX(0); }

/* Encabezado: Altura Fija */
.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  flex-shrink: 0;
}
.cart-header h3 { margin: 0; font-weight: 700; font-size: 1.2rem; }
.close-button { background: none; border: none; font-size: 0.9rem; color: #555; cursor: pointer; }

/* Contenido (Lista de productos): Flexible y con Scroll */
.cart-content {
  padding: 1rem 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0; /* Solución clave para el layout */
}
.cart-empty { text-align: center; padding: 2rem; }
.cart-empty a { color: #000; }
.cart-items-detailed { list-style: none; padding: 0; margin: 0; }
.cart-item-detailed { display: flex; gap: 1rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee; }
.item-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
.item-details { flex-grow: 1; }
.item-name { font-weight: 500; font-size: 0.9rem; }
.item-price { color: #555; font-size: 0.9rem; }
.item-quantity { display: flex; align-items: center; border: 1px solid #ccc; border-radius: 4px; }
.item-quantity button { background: none; border: none; width: 30px; height: 30px; cursor: pointer; font-size: 1rem; }
.item-quantity span { padding: 0 0.5rem; }
.remove-item-button { background: none; border: none; font-size: 1.5rem; color: #aaa; cursor: pointer; padding: 0 0.5rem; }

/* Pie de Página: Altura Fija */
.cart-footer-detailed {
  padding: 1.5rem;
  border-top: 1px solid #e5e5e5;
  background-color: #f8f9fa;
  flex-shrink: 0;
}
.shipping-options h4 { font-size: 1rem; font-weight: 600; margin: 0 0 1rem 0; }
.shipping-option { display: flex; margin-bottom: 0.5rem; }
.shipping-option input[type="radio"] { display: none; }
.shipping-option label { display: flex; justify-content: space-between; width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; }
.shipping-option input[type="radio"]:checked + label { border-color: #000; box-shadow: 0 0 0 2px #000; }
.option-name { font-weight: 500; }
.option-price { font-weight: 600; }
.cart-summary { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 1.5rem; border-top: 1px dashed #ccc; margin-top: 1.5rem; }
.summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
.summary-row.total { font-size: 1.2rem; font-weight: 700; margin-top: 0.5rem; }
.checkout-button-detailed { margin-top: 1.5rem; width: 100%; padding: 1rem; background-color: #000; color: #fff; border: none; cursor: pointer; font-size: 1rem; font-weight: 500; border-radius: 4px; transition: background-color 0.2s, opacity 0.2s; }
.checkout-button-detailed:disabled { background-color: #aaa; cursor: not-allowed; opacity: 0.7; }

@media (max-width: 768px) { .cart-drawer { max-width: 100vw; } }
</style>