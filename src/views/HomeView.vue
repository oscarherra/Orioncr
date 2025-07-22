<template>
  <div class="welcome-container">
    <h1>Bienvenido a Orión.cr</h1>
    <p>Pines y más para darle un toque único a tus chaquetas, bolsos y más.</p>
    <router-link to="/productos" class="cta-button">Ver Productos</router-link>
  </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

/* ... (tu CSS de .welcome-container, etc.) ... */

/* Añadimos la animación */
h1 {
  /* ... (tus otros estilos de h1) ... */
  animation: fadeInDown 1s ease-out;
}

p {
  /* ... (tus otros estilos de p) ... */
  animation: fadeInDown 1s ease-out 0.3s; /* 0.3s de retraso */
  animation-fill-mode: both; /* Mantiene el estado inicial antes de la animación */
}

.cta-button {
  /* ... (tus otros estilos del botón) ... */
  animation: fadeInUp 1s ease-out 0.6s; /* 0.6s de retraso */
  animation-fill-mode: both;
}

/* Definición de las animaciones */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>