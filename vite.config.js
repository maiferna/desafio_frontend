import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // necesario para Render
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-graficas-uzio.onrender.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
