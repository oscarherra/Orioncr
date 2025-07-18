<script setup>
import { ref } from 'vue';

// Se ha añadido un 'slug' a cada categoría para usarlo en la URL
const collections = ref([
  { 
    id: 1, 
    name: 'Anime', 
    slug: 'anime',
    description: 'Lleva tus personajes favoritos con diseños exclusivos y de calidad. ¡Ideal para verdaderos fans del anime!',
    imageUrl: new URL('../assets/img/kimetsu personajes.jpeg', import.meta.url).href
  },
  { 
    id: 2, 
    name: 'Harry Potter', 
    slug: 'harry-potter',
    description: '¿Eres Gryffindor, Slytherin, Hufflepuff o Ravenclaw? Encuentra la magia en nuestra colección especial de Harry Potter.',
    imageUrl: new URL('../assets/img/Coleccion escudos HP.jpeg', import.meta.url).href
  },
  { 
    id: 3, 
    name: 'Sanrio', 
    slug: 'sanrio',
    description: 'Hello Kitty, Kuromi, Cinnamoroll y todos tus amigos de Sanrio están aquí. ¡Descubre los pines más tiernos!',
    imageUrl: new URL('../assets/img/Collecion sanrio.jpeg', import.meta.url).href
  },
  { 
    id: 4, 
    name: 'Hora de Aventura', 
    slug: 'hora-de-aventura',
    description: '¡Es hora de la aventura! Acompaña a Finn y Jake en un viaje matemático con estos pines de la Tierra de Ooo.',
    imageUrl: new URL('../assets/img/Collecion bubble tea hora de aventura.jpeg', import.meta.url).href
  },
  { 
    id: 5, 
    name: 'Studio Ghibli', 
    slug: 'studio-ghibli',
    description: 'Sumérgete en los mundos mágicos de Hayao Miyazaki con diseños inspirados en Totoro, Chihiro y más.',
    imageUrl: new URL('../assets/img/collecion stdudio.jpeg', import.meta.url).href
  },
  { 
    id: 6, 
    name: 'Gatos', 
    slug: 'gatos',
    description: 'Para los amantes de los felinos. Encuentra desde gatitos adorables hasta los memes más famosos de internet.',
    imageUrl: new URL('../assets/img/gatos collecion.jpeg', import.meta.url).href
  },
  { 
    id: 7, 
    name: 'Humor', 
    slug: 'humor',
    description: 'Pines con frases ingeniosas, memes y diseños divertidos para sacarle una sonrisa a cualquiera.',
    imageUrl: new URL('../assets/img/humor.jpeg', import.meta.url).href
  },
  { 
    id: 8, 
    name: 'Star Wars', 
    slug: 'star-wars',
    description: 'Que la fuerza te acompañe. Elige tu lado con nuestra colección de una galaxia muy, muy lejana.',
    imageUrl: new URL('../assets/img/Collecion star wars.jpeg', import.meta.url).href
  },
  { 
    id: 9, 
    name: 'Música', 
    slug: 'musica',
    description: 'Lleva a tus bandas y artistas favoritos contigo. Desde rock clásico hasta los íconos del pop actual.',
    imageUrl: new URL('../assets/img/Collecion rock.jpeg', import.meta.url).href
  },
  { 
    id: 10, 
    name: 'Psicología', 
    slug: 'psicologia',
    description: 'Explora los conceptos de la mente y el bienestar con nuestra colección de pines para psicólogos y entusiastas.',
    imageUrl: new URL('../assets/img/Collecion Psicologia.jpeg', import.meta.url).href
  }
]);
</script>

<template>
  <div class="collections-page">
    <section 
      v-for="(collection, index) in collections" 
      :key="collection.id"
      class="collection-block"
      :class="{ 'alt-background': index % 2 !== 0 }"
    >
      <div class="collection-content-wrapper" :class="{ 'reverse-layout': index % 2 !== 0 }">
        
        <div class="image-container">
          <div class="image-frame">
            <img :src="collection.imageUrl" :alt="collection.name" />
          </div>
        </div>

        <div class="text-container">
          <h2>{{ collection.name }}</h2>
          <p>{{ collection.description }}</p>
          <router-link :to="`/productos?category=${collection.slug}`" class="btn">
            Ver categoría →
          </router-link>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.collections-page {
  width: 100%;
}

.collection-block {
  padding: 3.5rem 2rem;
}
.collection-block.alt-background {
  background-color: #f8f8f8; 
}

.collection-content-wrapper {
  max-width: 900px; 
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
.collection-content-wrapper.reverse-layout {
  flex-direction: row-reverse;
}

.image-container, .text-container {
  flex: 1;
}

.image-frame {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  padding: 1.2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
.image-frame img {
  width: 100%;
  display: block;
  border-radius: 20px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.text-container h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}
.text-container p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn:hover {
  background-color: #333;
  transform: translateY(-2px);
}

/* --- ESTILOS RESPONSIVOS --- */
@media (max-width: 992px) {
  .collection-content-wrapper,
  .collection-content-wrapper.reverse-layout {
    flex-direction: column;
    gap: 2rem;
  }
  .text-container {
    text-align: center;
  }
}
@media (max-width: 768px) {
  .collection-block {
    padding: 3rem 1.5rem;
  }
  .text-container h2 {
    font-size: 2rem;
  }
}
</style>