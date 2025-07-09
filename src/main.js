import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Importa createPinia
import App from './App.vue'
import router from './router'

const pinia = createPinia() // 2. Crea una instancia de Pinia
const app = createApp(App)

app.use(router)
app.use(pinia) // 3. Dile a la app que use Pinia

app.mount('#app')