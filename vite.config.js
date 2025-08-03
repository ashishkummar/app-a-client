import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src', // 👈 this tells Vite to look for index.html in src/
  plugins: [react()],
  build: {
    outDir: '../dist', // 👈 build output outside src/
    emptyOutDir: true
  }
})
