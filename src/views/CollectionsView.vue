<script setup>
import { ref } from 'vue';

// En el futuro, podrías obtener esta lista desde una base de datos.
const collections = ref([
  { id: 1, name: 'Animalitos', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Animalitos', path: '/productos' },
  { id: 2, name: 'Anime', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Anime', path: '/productos' },
  { id: 3, name: 'Arte', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Arte', path: '/productos' },
  { id: 4, name: 'Astronomía', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Astronomía', path: '/productos' },
  { id: 5, name: 'Comida', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Comida', path: '/productos' },
  { id: 6, name: 'Corazones', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Corazones', path: '/productos' },
  { id: 7, name: 'Cámaras', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Cámaras', path: '/productos' },
  { id: 8, name: 'Disney', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Disney', path: '/productos' },
  { id: 9, name: 'F1', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=F1', path: '/productos' },
  { id: 10, name: 'Farmacia', imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Farmacia', path: '/productos' },
]);
</script>

<template>
  <div class="collections-page">
    <h1>Colecciones</h1>
    <div class="collections-grid">
      <router-link
        v-for="collection in collections"
        :key="collection.id"
        :to="collection.path"
        class="collection-card"
      >
        <img :src="collection.imageUrl" :alt="collection.name" />
        <p>{{ collection.name }} →</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.collections-page {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.collections-page h1 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.collections-grid {
  display: grid;
  /* Elige un número de columnas o deja que se ajuste automáticamente. 5 columnas: */
  grid-template-columns: repeat(5, 1fr); 
  gap: 2rem;
}

/* Para hacerlo responsivo en pantallas más pequeñas */
@media (max-width: 1200px) {
  .collections-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 992px) {
  .collections-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.collection-card {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease-in-out;
}

.collection-card:hover {
  opacity: 0.8;
}

.collection-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.collection-card p {
  font-weight: 500;
  font-size: 1rem;
}
</style>