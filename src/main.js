import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia' // 1. Importa 'createPinia' directamente

import App from './App.vue'
import router from './router'

// import pinia from './stores' // 2. ELIMINA esta línea incorrecta

const app = createApp(App)
const head = createHead()
const pinia = createPinia() // 3. Crea la instancia de Pinia aquí

app.use(router)
app.use(pinia) // 4. Usa la instancia de Pinia
app.use(head)

app.mount('#app')