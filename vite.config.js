import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ],
  base: '/edu-it-react/',
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
})
