import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
