import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Inspector from 'vite-plugin-vue-inspector' // <-- 1. Importa el inspector

export default defineConfig({
  plugins: [
    vue(),
    Inspector(), // <-- 2. Agrégalo aquí, dentro del array de plugins
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})