import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 5001,
  },
  base:'/h5canvas/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
