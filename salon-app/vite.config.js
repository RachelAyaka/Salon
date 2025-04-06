import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
