import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvg } from './src/icons/svgIcon'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvg('./src/icons/svg/')],
  server: {
    open: true,
    port: 5002,
  },
  base:'/h5canvas/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
