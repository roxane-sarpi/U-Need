import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/ads': 'http://localhost:5000',
      '/categories': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/requests': 'http://localhost:5000',
      '/notifications': 'http://localhost:5000',
      '/conversation': 'http://localhost:5000',
      '/addmessages': 'http://localhost:5000',
      '/modifymessage': 'http://localhost:5000',
      '/delete': 'http://localhost:5000',
    },
  },
})
