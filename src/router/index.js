import { createRouter, createWebHistory } from 'vue-router';
// 1. Importa la nueva vista de inicio
import HomeView from '@/views/HomeView.vue'; 
import ProductosView from '@/views/ProductosView.vue';
const routes = [
  {
    // 2. La ruta principal ahora muestra la bienvenida
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    // 3. Creamos una ruta específica para los productos
    path: '/productos',
    name: 'Productos',
    component: ProductosView,
  },
  {
    path: '/producto/:id', // La ruta para un producto individual
    name: 'ProductDetail',
    // Importa el componente de la vista de detalle que crearemos a continuación
    component: () => import('@/views/ProductDetailView.vue')
  },
  {
    path: '/colecciones',
    name: 'Collections',
    component: () => import('@/views/CollectionsView.vue')
  },
  {
    path: '/envios',
    name: 'Shipping',
    component: () => import('@/views/ShippingView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;