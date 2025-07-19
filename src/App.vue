<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import SearchOverlay from './components/SearchOverlay.vue'; 
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />

    <ShoppingCart />
    <SearchOverlay />
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3) rotate(10deg); }
  100% { transform: scale(1); }
}

.pop-cart {
  animation: pop 0.4s ease-in-out;
}
</style>