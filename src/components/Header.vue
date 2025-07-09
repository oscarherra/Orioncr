<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useUiStore } from '@/stores/uiStore';

const cartStore = useCartStore();
const uiStore = useUiStore();
const isMobileMenuOpen = ref(false);
</script>

<template>
  <header class="site-header">
    <nav class="main-nav">
      <div class="nav-section nav-left">
        <button class="hamburger-button" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="desktop-nav-links">
          <router-link to="/productos" class="nav-link">Productos</router-link>
          <router-link to="/colecciones" class="nav-link">Colecciones</router-link>
        </div>
      </div>

      <div class="nav-section nav-center">
        <router-link to="/" class="logo">Orion.cr</router-link>
      </div>

      <div class="nav-section nav-right">
        <div class="desktop-nav-links">
          <router-link to="/envios" class="nav-link">Envíos</router-link>
        </div>
        <div class="icon-links">
          <button @click="uiStore.toggleSearch()" class="icon-button" aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <button @click="cartStore.toggleCart()" class="icon-button" aria-label="Carrito de compras">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span v-if="cartStore.cartCount > 0" class="cart-count-badge">{{ cartStore.cartCount }}</span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }">
      <router-link to="/productos" class="nav-link" @click="isMobileMenuOpen = false">Productos</router-link>
      <router-link to="/colecciones" class="nav-link" @click="isMobileMenuOpen = false">Colecciones</router-link>
      <router-link to="/envios" class="nav-link" @click="isMobileMenuOpen = false">Envíos</router-link>
    </div>
  </header>
</template>

<style scoped>
/* --- Estilos Base --- */
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 1.5rem; 
  position: relative; 
}
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  max-width: 1400px;
  margin: 0 auto;
}
.nav-section {
  display: flex;
  align-items: center;
}
.nav-left { flex: 1; justify-content: flex-start; }
.nav-center { flex: 1; justify-content: center; }
.nav-right { flex: 1; justify-content: flex-end; }
.logo {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  letter-spacing: -1px;
}
.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 1rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s ease;
}
.desktop-nav-links {
  display: flex;
}
.icon-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-left: 1rem;
}

/* Estilo unificado para todos los botones de íconos */
.icon-button {
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #1a1a1a;
  display: flex;
  align-items: center;
}
.icon-button svg {
  width: 22px;
  height: 22px;
  stroke-width: 1.5;
}
.cart-count-badge {
  position: absolute; top: -5px; right: -8px; background-color: #c92a2a; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; font-weight: 500; display: flex; align-items: center; justify-content: center; line-height: 1;
}
.hamburger-button {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
.mobile-nav {
  display: none;
}

/* --- Estilos Responsivos para Móvil --- */
@media (max-width: 992px) {
  .desktop-nav-links {
    display: none;
  }
  .hamburger-button {
    display: block;
  }
  .nav-left, .nav-right {
    flex: none;
  }
  .nav-center {
    flex: 1;
  }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #e5e5e5;
    z-index: 100;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
  }
  .mobile-nav.is-open {
    max-height: 500px;
  }
  .mobile-nav .nav-link {
    padding: 1rem 1.5rem;
    border-top: 1px solid #f1f1f1;
    margin: 0;
    text-align: center;
  }
  .mobile-nav .nav-link:first-child {
    border-top: none;
  }
}
</style>