<template>
  <div class="shipping-container">
    <div class="shipping-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    </div>
    
    <h1>Información de Envíos</h1>
    
    <p class="description">
      Orion.cr es un emprendimiento que se ubica en Liberia, Guanacaste, y hace envíos a todo el país mediante Correos de Costa Rica.
    </p>

    <div class="rates-card">
      <h2>Nuestras Tarifas</h2>
      <ul class="rates-list">
        <li class="rate-item">
          <span class="rate-area">GAM (Gran Área Metropolitana)</span>
          <span class="rate-price">₡2,850</span>
        </li>
        <li class="rate-item">
          <span class="rate-area">Fuera del GAM (Resto del País)</span>
          <span class="rate-price">₡3,650</span>
        </li>
        <li class="rate-item personal-delivery">
          <span class="rate-area">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Entrega Personal (Liberia)
          </span>
          <span class="rate-price">Sin Costo Adicional</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.shipping-container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.shipping-icon {
  color: #555;
  margin-bottom: 1rem;
}
h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}
.description {
  font-size: 1.1rem;
  color: #555;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 3rem;
}
.rates-card {
  width: 100%;
  max-width: 550px; /* Un poco más ancho */
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.rates-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.rates-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0; /* Un poco más de padding */
}
.rate-item:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}
.rate-area {
  font-weight: 500;
}
.rate-price {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
}

/* --- NUEVOS ESTILOS --- */
.personal-delivery {
  background-color: #e6fcf5; /* Un fondo verde menta suave */
  border-radius: 8px;
  margin-top: 1rem;
  padding: 1.2rem 1.5rem; /* Padding interno */
  border: 1px solid #b3f0dd;
}
.personal-delivery .rate-area {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Espacio entre el ícono y el texto */
  color: #087f5b;
  font-weight: 700;
}
.personal-delivery .rate-price {
  color: #087f5b;
}
.personal-delivery svg {
  width: 20px;
  height: 20px;
}
</style>