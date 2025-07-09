import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // --- CARGAR ESTADO INICIAL DESDE LOCALSTORAGE ---
  const initialItems = JSON.parse(localStorage.getItem('cart-items')) || [];
  const initialShipping = JSON.parse(localStorage.getItem('cart-shipping')) || null;

  // --- STATE ---
  const isOpen = ref(false);
  const items = ref(initialItems);
  
  // --- NUEVO: ESTADO PARA ENVÍOS ---
  const shippingOptions = ref([
    { id: 'gam', name: 'GAM (Gran Área Metropolitana)', price: 2850 },
    { id: 'fuera_gam', name: 'Fuera del GAM', price: 3650 },
    { id: 'personal', name: 'Entrega Personal (Liberia)', price: 0 }
  ]);
  const selectedShippingOptionId = ref(initialShipping);

  // --- GETTERS (Propiedades calculadas) ---
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  });

  const selectedShippingCost = computed(() => {
    if (!selectedShippingOptionId.value) return 0;
    const option = shippingOptions.value.find(o => o.id === selectedShippingOptionId.value);
    return option ? option.price : 0;
  });

  const totalPrice = computed(() => {
    return subtotal.value + selectedShippingCost.value;
  });

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });
  const isEmpty = computed(() => items.value.length === 0);

  // --- ACTIONS (Funciones) ---
  function toggleCart() {
    isOpen.value = !isOpen.value;
  }
  function selectShippingOption(optionId) {
    selectedShippingOptionId.value = optionId;
  }
  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }
  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId);
  }
  function increaseItemQuantity(productId) {
    const item = items.value.find(item => item.id === productId);
    if (item) item.quantity++;
  }
  function decreaseItemQuantity(productId) {
    const item = items.value.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      removeItem(productId);
    }
  }
  
  // --- GUARDAR ESTADO EN LOCALSTORAGE ---
  watch(items, (newItems) => {
    localStorage.setItem('cart-items', JSON.stringify(newItems));
  }, { deep: true });

  watch(selectedShippingOptionId, (newShippingId) => {
    localStorage.setItem('cart-shipping', JSON.stringify(newShippingId));
  });

  return { 
    isOpen, items, cartCount, isEmpty, totalPrice, subtotal,
    shippingOptions, selectedShippingOptionId, selectedShippingCost,
    toggleCart, addItem, removeItem, increaseItemQuantity, decreaseItemQuantity,
    selectShippingOption
  };
});